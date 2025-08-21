export interface IMenuItem {
  menuNo: string;           // 메뉴번호
  menuNm: string;           // 메뉴명
  upperMenuNo: string;      // 상위메뉴번호
  menuLevelCd: string;      // 메뉴 수준코드
  menuSeCd: string;         // 메뉴 구분코드
  menuIconUrl: string;      // 메뉴 아이콘 경로
  menuHref: string;         // 메뉴 접근 경로
  subMenu: IMenuItem[];     // 하위메뉴
};

// Header에서 사용할 타입
export interface IHeaderMenuItem {
  id: string;
  label: string;
  href: string;      // 최상위가 '펼침만'이면 빈 문자열
  menuNo: string;
  iconUrl?: string;  // ← 아이콘 경로 복구용
};
