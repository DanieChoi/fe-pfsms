"use client";

import { useState } from "react";

import CommonCodeManagerSearch, { CommonCodeSearch } from "./CommonCodeManagerSearch";
import { useCommonCodeManagerStore } from "@/store/useCommonCodeManagerStore";
import CommonCodeManagerList from "./CommonCodeManagerList";
import { useApiForCommonCodeSearchList } from "@/features/system/commonCodeManager/hooks/useApiForCommonCodeSearchList";
import ServerErrorCheck from "@/components/providers/ServerErrorCheck";

export function CommonCodeManager() {
  const [searchInit, setSearchInit] = useState<boolean>(false);

  const { cmmnCd, setCmmnCd, cmmnNm, setCmmnNm, useYn, setUseYn } = useCommonCodeManagerStore();

  const { mutate: getCommonCodeSearchList } = useApiForCommonCodeSearchList({
    onSuccess: (data) => {
      if(data.commonCodeList.length > 0) {
      }
    },
    onError: (error) => {
      ServerErrorCheck('공통코드 검색어 조회', error.message);
    }
  });

  const [commonCodeSearchParam, setCommonCodeSearchParam] = useState<CommonCodeSearch>();
  const handleCommonCodeSearch = (param: CommonCodeSearch) => {
    setCmmnCd(param.commonCodeCode+'');
    setCmmnNm(param.commonCodeName);
    setUseYn(param.useYn+'');
  };

  const handleCommonCodeSelect = (cmmnCd: string) => {
    if(cmmnCd != '') {

    } else {
      
    }
  };

  const handleSearchInit = () => {
    setSearchInit(false);
  };

  return (
    <div className='contents-wrap stable-scrollbar' style={{
      overflowY: 'scroll',
      scrollbarGutter: 'stable',
      boxSizing: 'border-box',
      width: '100%',
      height: '100%',
      contain: 'content',
    }}>
      <div className='flex flex-col gap-[15px] limit-width'>
        <CommonCodeManagerSearch init={searchInit} setInit={handleSearchInit} onSearch={handleCommonCodeSearch} />
        <div className="flex gap-[30px]">
          <CommonCodeManagerList
            campaignId={campaignIdForUpdateFromSideMenu || ''}
            campaignGroupHeaderSearchParam={campaignGroupHeaderSearchParam}
            campaignGroupList={_campaignGroupList}
            groupCampaignListData={tempCampaignListData}
            selectedGroupId={_groupId+''}
            onCommonCodeSelect={handleCommonCodeSelect}
            onSelectCommonCodeList={handleSelectCommonCodeList}
          />
          {/* <CommonDetailCodeManagerList
            campaignId={campaignIdForUpdateFromSideMenu || masterCampaignId}
            isOpen={isOpen}
            onCampaignPopupClose={onCampaignPopupClose}
            setInit={handleDetailInit}
          /> */}
        </div>
      </div>
    </div>
  );
}
