import { IHeaderMenuItem, IMenuItem } from "@/types/interface";

// 최초 이동 경로 (최하위 페이지 찾기)
export const firstLeafHref = (menu: IMenuItem): string => {
  const q: IMenuItem[] = [menu];
  while (q.length) {
    const cur = q.shift()!;
    if (cur.menuHref && cur.menuHref.trim() !== "") return cur.menuHref;
    if (cur.subMenu?.length) q.unshift(...cur.subMenu);
  }
  return "";
};

// 현재 경로가 속한 최상위
export const findTopByPath = (path: string, availableMenu: IMenuItem[]): IMenuItem | undefined => {
  const contains = (n: IMenuItem): boolean =>
    (!!n.menuHref && path.startsWith(n.menuHref)) || (n.subMenu?.some(contains) ?? false);
  return availableMenu.find(contains);
};

// 헤더 메뉴(아이콘 포함) - 모든 최상위 메뉴는 첫 번째 하위 페이지로 이동
export const headerMenus = (availableMenu: IMenuItem[]): IHeaderMenuItem[] => {
  return availableMenu
    .filter(m => m.menuLevelCd === "1")
    .map(m => ({
      id: m.menuNo,
      label: m.menuNm,
      href: m.menuHref?.trim() || firstLeafHref(m),
      menuNo: m.menuNo,
      iconUrl: m.menuIconUrl || undefined
    }));
}
export const NAV_OPEN_TOP_EVENT = "nav:open-top";
export type NavOpenTopDetail = { menuNo: string };