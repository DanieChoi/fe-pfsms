import { create } from "zustand";

import { IMenuItem } from "@/types/interface/object";

type NavState = {
  expanded: Set<string>;
  activeTopNo: string | null;
  activeLeafNo: string | null;
  filteredTopNo: string | null; // 헤더에서 선택된 최상위 메뉴
  toggle: (menuNo: string) => void;
  openTop: (menuNo: string) => void;
  setFromPath: (path: string, availableMenu: IMenuItem[]) => void;
  setFilteredTop: (menuNo: string | null) => void; // 필터링 설정
};

function findBestMatchByPath(path: string, availableMenu: IMenuItem[]) {
  let bestMatch: { menu: IMenuItem | null; depth: number; pathLength: number } = {
    menu: null,
    depth: 0,
    pathLength: 0,
  };
  let expandChain: IMenuItem[] = [];

  const dfs = (node: IMenuItem, chain: IMenuItem[], depth: number) => {
    const nextChain = [...chain, node];
    const href = node.menuHref?.trim() || "";

    // 경로가 정확히 매칭되는 경우만 처리
    if (href && path === href) {
      // 정확한 매칭이 가장 우선
      bestMatch = { menu: node, depth, pathLength: href.length };
      expandChain = nextChain;
    } else if (href && path.startsWith(href) && href.length > bestMatch.pathLength) {
      // startsWith 매칭은 더 긴 경로가 우선
      bestMatch = { menu: node, depth, pathLength: href.length };
      expandChain = nextChain;
    }

    if (node.subMenu) {
      node.subMenu.forEach((child) => dfs(child, nextChain, depth + 1));
    }
  };

  availableMenu.forEach((top) => dfs(top, [], 0));

  return { activeMenu: bestMatch.menu, chain: expandChain };
}

export const useNavStore = create<NavState>((set) => ({
  expanded: new Set<string>(["MNU100"]),
  activeTopNo: "MNU100", // 초기값: 조직/사원
  activeLeafNo: null,
  filteredTopNo: "MNU100", // 초기값: 조직/사원 필터링

  toggle: (menuNo) =>
    set((s) => {
      const next = new Set(s.expanded);
      if (next.has(menuNo)) {
        next.delete(menuNo);
      } else {
        next.add(menuNo);
      }
      return { expanded: next };
    }),

  openTop: (menuNo) =>
    set((s) => {
      const next = new Set(s.expanded);
      next.add(menuNo);
      return { expanded: next, activeTopNo: menuNo };
    }),

  setFilteredTop: (menuNo) =>
    set(() => ({
      filteredTopNo: menuNo,
    })),

  setFromPath: (path: string, availableMenu: IMenuItem[]) =>
    set((s) => {
      const { activeMenu, chain } = findBestMatchByPath(path, availableMenu);
      const next = new Set(s.expanded);

      // 체인의 모든 상위 메뉴 확장
      chain.forEach((menu) => next.add(menu.menuNo));

      const topNo = chain.length > 0 ? chain[0].menuNo : null;
      const leafNo = activeMenu?.menuNo || null;

      return {
        expanded: next,
        activeTopNo: topNo,
        activeLeafNo: leafNo,
      };
    }),
}));