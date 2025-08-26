import { useState } from "react";

import CommonCodeManagerSearch, { CommonCodeSearch } from "./CommonCodeManagerSearch";
import CommonCodeManagerList, { CommonCodeListProps, CommonDetailCodeListProps } from "./CommonCodeManagerList";
import { useApiForCommonCodeSearchList } from "@/features/system/commonCodeManager/hooks/useApiForCommonCodeSearchList";
import ServerErrorCheck from "@/components/providers/ServerErrorCheck";

type Props = {
  cmmnCd?: string;
  cmmnNm?: string;
  useYn?: string;
}

const CommonCodeManager = ({ cmmnCd, cmmnNm, useYn }: Props) => {
  
  //          state: 공통코드리스트 상태            //
  const [ commonCodeList, setCommonCodeList ] = useState<CommonCodeListProps[]>([]);

  //          state: 공통상세코드리스트 상태            //
  const [ commonDetailCodeList, setCommonDetailCodeList ] = useState<CommonDetailCodeListProps[]>([]);

  //          state: 공통코드 조회 파라매트 상태            //
  const [ commonCodeSearchParam, setCommonCodeSearchParam ] = useState<CommonCodeSearch>();

  //          state: 선택한 공통코드 상태            //
  const [ selectedCmmnCd, setSelectedCmmnCd ] = useState<CommonCodeListProps>();

  //          state: 선택한 공통코드 코드 상태            //
  const [ selectedCmmnCdCd, setSelectedCmmnCdCd ] = useState<string>(cmmnCd ? cmmnCd : '');

  //          state: 선택한 공통상세코드 코드 상태            //
  const [ selectedCmmnDtlCdCd, setSelectedCmmnDtlCdCd ] = useState<string>('');

  //          event handler: 조회버튼 클릭 이벤트 처리            //
  const handleCommonCodeSearch = (param: CommonCodeSearch) => {
    setCommonCodeSearchParam(param);
  };

  //          event handler: 공통코드 그리드 특정 행 클릭 이벤트 처리            //
  const handleCommonCodeSelect = (cmmnCd: string) => {
    if(cmmnCd != '') {
      setSelectedCmmnCdCd(cmmnCd);
      setSelectedCmmnCd(commonCodeList.find((item) => item.cmmnCd === cmmnCd) || undefined);
      setSelectedCmmnDtlCdCd('');
    } else {
      setSelectedCmmnCdCd('');
      setSelectedCmmnCd(undefined);
      setSelectedCmmnDtlCdCd('');
    }
  };

  //          event handler: 공통상세코드 그리드 특정 행 클릭 이벤트 처리            //
  const handleCommonDetailCodeSelect = (cmmdDtlCd: string) => {
    setSelectedCmmnDtlCdCd(cmmdDtlCd);
  };

  //          function: sign in response 처리 함수            //
  const { mutate: getCommonCodeSearchList } = useApiForCommonCodeSearchList({
    onSuccess: (data) => {
      if(data.commonCodeList.length > 0) {
      }
    },
    onError: (error) => {
      ServerErrorCheck('공통코드 검색어 조회', error.message);
    }
  });

  return (
    <div className='flex flex-col gap-[15px] limit-width'>
      <CommonCodeManagerSearch cmmnCdCd={cmmnCd || ''}  onSearch={handleCommonCodeSearch} />
      <div className="flex gap-[30px]">
        <CommonCodeManagerList
          cmmnCdSearchParam={commonCodeSearchParam}
          commonCodeList={commonCodeList}
          commonDetailCodeList={commonDetailCodeList}
          selectedCmmnCdCd={selectedCmmnCdCd}
          onCommonCodeSelect={handleCommonCodeSelect}
          onCommonDetailCodeSelect={handleCommonDetailCodeSelect}
        />
      </div>
    </div>
  )
}

export default CommonCodeManager