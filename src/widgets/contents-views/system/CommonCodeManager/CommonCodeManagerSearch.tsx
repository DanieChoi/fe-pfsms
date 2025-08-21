import { useEffect, useState } from "react";

import CommonButton from "@/components/CommonButton";
import { CustomInput } from "@/components/CustomInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/CustomSelect";
import { Label } from "@/shared/ui/label";

const useYnList = [
  { useYn_code: 'Y', useYn_name: '사용' },
  { useYn_code: 'N', useYn_name: '미사용' },
];

export interface CommonCodeSearch {
  commonCodeCode: string;
  commonCodeName: string;
  useYn: string;
}

type Props = {
  onSearch: (param: CommonCodeSearch) => void;
  init: boolean;
  setInit: () => void;
}

export default function CommonCodeManagerSearch({ onSearch,init,setInit }: Props) {
  const [commonCodeCode, setCommonCodeCode] = useState('');     // 공통코드코드
  const [commonCodeName, setCommonCodeName] = useState('');     // 공통코드명
  const [useYn, setUseYn] = useState('');                       // 사용여부

  const onButtonSearch = () => {
    const param: CommonCodeSearch = {
      commonCodeCode: commonCodeCode,
      commonCodeName: commonCodeName,
      useYn: useYn === 'all' ? '' : useYn,
    };
    onSearch(param);
  };
  
  useEffect(() => {
    if (init) {
      setInit();
      setCommonCodeCode('');
      setCommonCodeName('');
      setUseYn('all');
      onSearch({
        commonCodeCode: '',
        commonCodeName: '',
        useYn: ''
      });
    }
  }, [init, onSearch, setInit]);

  return (
    <div className="flex title-background justify-between">
      <div className="flex gap-[40px] gap-use-10 items-center flex-wrap">
        <div className="flex items-center">
          <Label className="pr-[15px] whitespace-nowrap">공통코드</Label>
          <CustomInput
            type="text"
            value={commonCodeCode}
            onChange={(e) => setCommonCodeCode(e.target.value)}
            className="w-[180px] w-use-140 truncate"
          />
        </div>
        <div className="flex items-center">
          <Label className="pr-[15px] whitespace-nowrap">공통코드 명</Label>
          <CustomInput
            type="text"
            value={commonCodeName}
            onChange={(e) => setCommonCodeName(e.target.value)}
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
                  key={option.useYn_code}
                  value={option.useYn_code + ''}
                  className="truncate"
                >
                  {option.useYn_name}
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