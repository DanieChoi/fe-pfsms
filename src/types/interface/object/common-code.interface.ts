import { INameByLanguageItem } from "./name-by-language.interface";

export interface ICommonCodeItem {
  cmmnCd: string;                         // 공통코드
  cmmnNm: INameByLanguageItem[];          // 언어별 공통코드명리스트
  rmCntnt: string;                        // 비고내용
  cdLen: number;                          // 상세코드길이
  indictOrdr: number;                     // 코드 표시순서
  upperCmmnCd: string;                    // 상위 공통코드
  useYn: string;                          // 사용여부
};