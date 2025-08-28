'use client';

import { useEffect, useMemo, useState } from "react";
import { DataGrid, SelectColumn, Column as GridColumn } from "react-data-grid";

import { CommonCodeSearch } from "./CommonCodeManagerSearch";
import TitleWrap from "@/components/TitleWrap";
import { INameByLanguageItem } from "@/types/interface/object";

type Column = GridColumn<Row>;

type Row = {
  no: number;
  cmmnCd: string;
  cmmnNm: INameByLanguageItem[];
  cdLen: number;
  indictOrdr: number;
  upperCmmnCd: string;
  useYn: string;
  rmCntnt: string;
};

const commonCodeColumns: Column[] = [
  { key: "no", name: "NO.", width: 60, resizable: true },
  { key: "cmmnCd", name: "공통코드", width: 120, resizable: true },
  { key: "cmmnNm", name: "공통코드명", width: 180, resizable: true },
  { key: "cdLen", name: "상세코드길이", width: 100, resizable: true },
  { key: "indictOrdr", name: "표시순서", width: 100, resizable: true },
  { key: "upperCmmnCd", name: "상위공통코드", width: 120, resizable: true },
  { key: "useYn", name: "사용여부", width: 100, resizable: true },
  { key: "rmCntnt", name: "비고", width: 180, resizable: true },
];

const commonDetaiilCodeColumns = [
  SelectColumn,
  { key: "no", name: "NO.", width: 60, resizable: true },
  { key: "cmmnCd", name: "공통코드", width: 120, resizable: true },
  { key: "cmmnNm", name: "공통코드명", width: 180, resizable: true },
  { key: "cdLen", name: "상세코드길이", width: 100, resizable: true },
  { key: "indictOrdr", name: "표시순서", width: 100, resizable: true },
  { key: "upperCmmnCd", name: "상위공통코드", width: 120, resizable: true },
  { key: "useYn", name: "사용여부", width: 100, resizable: true },
  { key: "rmCntnt", name: "비고", width: 180, resizable: true },
];

export interface CommonCodeListProps {
  no: number;
  cmmnCd: string;
  cmmnNm: INameByLanguageItem[];
  cdLen: number;
  indictOrdr: number;
  upperCmmnCd: string;
  useYn: string;
  rmCntnt: string;
}

export interface CommonDetailCodeListProps {
  no: number;
  cmmnCd: string;
  cmmnDtlCd: string;
  cmmnDtlNm: INameByLanguageItem[];
}

type Props = {
  cmmnCdSearchParam?: CommonCodeSearch;
  commonCodeList?: CommonCodeListProps[];
  commonDetailCodeList?: CommonDetailCodeListProps[];
  selectedCmmnCdCd?: string;
  onCommonCodeSelect: (cmmnCd: string) => void;
  onCommonDetailCodeSelect: (cmmnDtlCd: string) => void;
};

export default function CommonCodeManagerList({
  cmmnCdSearchParam,
  commonCodeList,
  commonDetailCodeList,
  selectedCmmnCdCd,
  onCommonCodeSelect,
  onCommonDetailCodeSelect,
}: Props) {

  const [tmpCommonCodes, setTmpCommonCodes] = useState<CommonCodeListProps[]>([]);
  const [searchedCommonCodeList, setSearchedCommonCodeList] = useState<CommonCodeListProps[]>([]);
  const memoizedCommonCodeColumns = useMemo(() => commonCodeColumns, [commonCodeColumns]);
  const memoizedCommonCodeRows = useMemo(() => commonCodeList || [], [commonCodeList])
  const [selectedCommonCodeRow, setSelectedCommonCodeRow] = useState<CommonCodeListProps | null>(null);

  const handleCellClick = (args: { row: Row; column: GridColumn<Row> }) => {
    setSelectedCommonCodeRow(args.row);
    onCommonCodeSelect(args.row.cmmnCd.toString());
  };

  const getCommonCodeRowClass = (row: CommonCodeListProps) => {
    return selectedCommonCodeRow?.cmmnCd === row.cmmnCd ? 'bg-[#FFFAEE]' : '';
  };

  useEffect(() => {
    if(selectedCmmnCdCd && (commonCodeList?.length ?? 0) > 0) {
      const selectedRow = (commonCodeList ?? []).find(commonCode => commonCode.cmmnCd === selectedCmmnCdCd)
      setSelectedCommonCodeRow(selectedRow ?? null);
      onCommonCodeSelect(selectedCmmnCdCd);
    }
  }, [selectedCmmnCdCd, commonCodeList, onCommonCodeSelect]);

  useEffect(() => {
    if(typeof cmmnCdSearchParam != 'undefined') {
      let tmpCommonCodeList: CommonCodeListProps[] = commonCodeList || [];
      if(cmmnCdSearchParam.commonCodeCd !== '') {
        tmpCommonCodeList = tmpCommonCodeList.filter((commonCode) => commonCode.cmmnCd === cmmnCdSearchParam.commonCodeCd)
          .map((commonCode, idx) => {
            return {
              no: idx+1,
              cmmnCd: commonCode.cmmnCd,
              cmmnNm: commonCode.cmmnNm,
              cdLen: commonCode.cdLen,
              indictOrdr: commonCode.indictOrdr,
              upperCmmnCd: commonCode.upperCmmnCd,
              useYn: commonCode.useYn,
              rmCntnt: commonCode.rmCntnt
            }
          });
      }
      if(cmmnCdSearchParam.useYn !== '') {
        tmpCommonCodeList = tmpCommonCodeList.filter((commonCode) => commonCode.useYn === cmmnCdSearchParam.useYn)
          .map((commonCode, idx) => {
            return {
              no: idx+1,
              cmmnCd: commonCode.cmmnCd,
              cmmnNm: commonCode.cmmnNm,
              cdLen: commonCode.cdLen,
              indictOrdr: commonCode.indictOrdr,
              upperCmmnCd: commonCode.upperCmmnCd,
              useYn: commonCode.useYn,
              rmCntnt: commonCode.rmCntnt
            }
          });
      }
      setSearchedCommonCodeList(tmpCommonCodeList as unknown as CommonCodeListProps[]);
    } else {
      setSearchedCommonCodeList(commonCodeList as unknown as CommonCodeListProps[]);
    }
  }, [cmmnCdSearchParam, commonCodeList]);

  return (
    <div className="w-[40%] shrink-0">
      <TitleWrap title="공통코드 목록" totalCount={tmpCommonCodes?.length || 0} />
      <div className="overflow-x-auto">
        <div className="grid-custom-wrap h-[200px]">
          <DataGrid 
            columns={memoizedCommonCodeColumns} 
            rows={searchedCommonCodeList} 
            className="grid-custom" 
            rowHeight={30}
            rowClass={getCommonCodeRowClass}
            headerRowHeight={30}
            onCellClick={handleCellClick}
            selectedRows={selectedCommonCodeRow ? new Set<string>([selectedCommonCodeRow.cmmnCd]) : new Set<string>()}
            />
        </div>
      </div>
    </div>
  );
}