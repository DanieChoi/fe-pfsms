import { useEffect, useState } from "react";

import CommonCodeManagerSearch, { CommonCodeSearch } from "./CommonCodeManagerSearch";
import CommonCodeManagerList, { CommonCodeListProps, CommonDetailCodeListProps } from "./CommonCodeManagerList";
import { useApiForCommonCodeSearchList } from "@/features/system/commonCodeManager/hooks/useApiForCommonCodeSearchList";
import ServerErrorCheck from "@/components/providers/ServerErrorCheck";
import { INameByLanguageItem } from "@/types/interface/object";

type Props = {
  cmmnCd?: string;
  cmmnNm?: string;
  useYn?: string;
}

export default function CommonCodeManager() {
  
  //          state: 공통코드리스트 상태            //
  const [ commonCodeList, setCommonCodeList ] = useState<CommonCodeListProps[]>([]);

  //          state: 공통상세코드리스트 상태            //
  const [ commonDetailCodeList, setCommonDetailCodeList ] = useState<CommonDetailCodeListProps[]>([]);

  //          state: 공통코드 조회 파라매트 상태            //
  const [ commonCodeSearchParam, setCommonCodeSearchParam ] = useState<CommonCodeSearch>();

  //          state: 선택한 공통코드 상태            //
  const [ selectedCmmnCd, setSelectedCmmnCd ] = useState<CommonCodeListProps>();

  //          state: 선택한 공통코드 코드 상태            //
  const [ selectedCmmnCdCd, setSelectedCmmnCdCd ] = useState<string>('');

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

  //          function: 공통코드 검색 가져오기 response 처리 함수            //
  const { mutate: getCommonCodeSearchList } = useApiForCommonCodeSearchList({
    onSuccess: (data) => {
      const getRows: CommonCodeListProps[] = [];

      if(data.commonCodeList.length > 0) {
        for(let i = 0; i < data.commonCodeList.length; i++) {
          const arrCmmnNm: INameByLanguageItem[] = [];
          for(let j = 0; j < data.commonCodeList[i].cmmnNm.length; j++) {
            arrCmmnNm.push({
              langCd: data.commonCodeList[i].cmmnNm[j].langCd,
              itemNm: data.commonCodeList[i].cmmnNm[j].itemNm
            });
          }            
          getRows.push({
            no: getRows.length + 1,
            cmmnCd: data.commonCodeList[i].cmmnCd,
            cmmnNm: arrCmmnNm,
            cdLen: data.commonCodeList[i].cdLen,
            indictOrdr: data.commonCodeList[i].indictOrdr,
            upperCmmnCd: data.commonCodeList[i].upperCmmnCd,
            useYn: data.commonCodeList[i].useYn,
            rmCntnt: data.commonCodeList[i].rmCntnt
          });
        }
      }
      setCommonCodeList(getRows);
    },
    onError: (error) => {
      ServerErrorCheck('공통코드 검색어 조회', error.message);
    }
  });

  useEffect(() => {
    getCommonCodeSearchList(null);
  }, [getCommonCodeSearchList]);

  return (
    <div>
      <div className='flex flex-col gap-[15px] limit-width'>
        <CommonCodeManagerSearch onSearch={handleCommonCodeSearch} />
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
    </div>
  );
};