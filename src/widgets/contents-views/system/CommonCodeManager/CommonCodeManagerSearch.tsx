import { useEffect, useState } from "react";

import CommonButton from "@/components/CommonButton";
import { CustomInput } from "@/components/CustomInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/CustomSelect";
import { Label } from "@/shared/ui/label";

const useYnList = [
  { useyn_cd: 'Y', useyn_nm: '사용' },
  { useyn_cd: 'N', useyn_nm: '미사용' },
];

export interface CommonCodeSearch {
  commonCodeCd: string;
  commonCodeNm: string;
  useYn: string;
}

type Props = {
  onSearch: (param: CommonCodeSearch) => void;
}

export default function CommonCodeManagerSearch({ onSearch }: Props) {
  const [commonCodeCd, setCommonCodeCd] = useState('');     // 공통코드코드
  const [commonCodeNm, setCommonCodeNm] = useState('');     // 공통코드명
  const [useYn, setUseYn] = useState('all');                // 사용여부

  const onButtonSearch = () => {
    const param: CommonCodeSearch = {
      commonCodeCd: commonCodeCd,
      commonCodeNm: commonCodeNm,
      useYn: useYn === 'all' ? '' : useYn,
    };
    onSearch(param);
  };
  
  return (
    <div className="flex title-background justify-between">
      <div className="flex gap-[40px] gap-use-10 items-center flex-wrap">
        <div className="flex items-center">
          <Label className="pr-[15px] whitespace-nowrap">공통코드</Label>
          <CustomInput
            type="text"
            value={commonCodeCd}
            onChange={(e) => setCommonCodeCd(e.target.value)}
            className="w-[180px] w-use-140 truncate"
          />
        </div>
        <div className="flex items-center">
          <Label className="pr-[15px] whitespace-nowrap">공통코드 명</Label>
          <CustomInput
            type="text"
            value={commonCodeNm}
            onChange={(e) => setCommonCodeNm(e.target.value)}
            className="w-[180px] w-use-140 truncate"
          />
        </div>
        <div className="flex items-center">
          <Label className="pr-[15px] whitespace-nowrap">사용여부</Label>
          <Select defaultValue="all" value={useYn} onValueChange={setUseYn}>
            <SelectTrigger className="w-[180px] w-use-140">
              <SelectValue placeholder="사용여부" className="truncate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="truncate">전체</SelectItem>
              {useYnList.map(option => (
                <SelectItem
                  key={option.useyn_cd}
                  value={option.useyn_cd + ''}
                >
                  {option.useyn_nm}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end gap-2 items-center">
        <CommonButton onClick={onButtonSearch}>조회</CommonButton>
      </div>
    </div>
  );
}