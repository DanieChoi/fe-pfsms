'use client';

import { useMemo, useState } from "react";
import DataGrid, { CellClickArgs, SelectColumn, Column as GridColumn } from "react-data-grid";

import { CommonCodeSearch } from "./CommonCodeManagerSearch";
import TitleWrap from "@/components/TitleWrap";

type Column = GridColumn<Row>;

type Row = {
  no: number;
  cmmnCd: string;
  cmmnNm: string;
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

export interface DataProps {
  no: number;
  cmmnCd: string;
  cmmnNm: string;
  cdLen: number;
  indictOrdr: number;
  upperCmmnCd: string;
  useYn: string;
  rmCntnt: string;
}

type Props = {
  cmmnCd?: string;
  cmmnCdSearchParam?: CommonCodeSearch;
  onCommonCodeSelect: (cmmnCd: string) => void;
  onCommonDetailCodeSelect: (cmmnCd: string) => void;
};

export default function CommonCodeManagerList({
  cmmnCd,
  cmmnCdSearchParam,
  onCommonCodeSelect,
  onCommonDetailCodeSelect,
}: Props) {

  const [tmpCommonCodes, setTmpCommonCodes] = useState<DataProps[]>([]);
  const memoizedCommonCodeColumns = useMemo(() => commonCodeColumns, [commonCodeColumns]);
  const [selectedCommonCodeRow, setSelectedCommonCodeRow] = useState<DataProps | null>(null);

  const handleCellClick = ({ row }: CellClickArgs<Row>) => {
    setSelectedCommonCodeRow(row);
    onCommonCodeSelect(row.cmmnCd.toString());
  };

  const getCommonCodeRowClass = (row: DataProps) => {
    return selectedCommonCodeRow?.cmmnCd === row.cmmnCd ? 'bg-[#FFFAEE]' : '';
  };

  return (
    <div className="w-[40%] shrink-0">
      <TitleWrap title="공통코드 목록" totalCount={tmpCommonCodes?.length || 0} />
      <div className="overflow-x-auto">
        <div className="grid-custom-wrap h-[200px]">
          <DataGrid 
            columns={memoizedCommonCodeColumns} 
            rows={tmpCommonCodes} 
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