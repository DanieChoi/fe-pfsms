import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CommonCodeManagerState {
  cmmnCd: string;
  cmmnNm: string;
  useYn: string;
  totalCount: number;
}

interface CommonCodeManagerActions {
  setCmmnCd: (cmmnCd: string) => void;
  setCmmnNm: (cmmnNm: string) => void;
  setUseYn: (useYn: string) => void;
  setTotalCount: (count: number) => void;

  setResetCommonCodeManagerStore: () => void;
}

type CommonCodeManagerStore = CommonCodeManagerState & CommonCodeManagerActions;

export const useCommonCodeManagerStore = create<CommonCodeManagerStore>()(
  devtools(
    persist(
      (set) => ({
        cmmnCd: '',
        cmmnNm: '',
        useYn: '',
        totalCount: 0,
        setTotalCount: (totalCount) => set({ totalCount }),
        setCmmnCd: (cmmnCd) => set({ cmmnCd }),
        setCmmnNm: (cmmnNm) => set({ cmmnNm }),
        setUseYn: (useYn) => set({ useYn }),
        setResetCommonCodeManagerStore: () => set({
          cmmnCd: '',
          cmmnNm: '',
          useYn: '',
        })
      }),
      {
        name: 'commoncode-manager-store', // localStorage에 저장될 키 이름
        // storage: createJSONStorage(() => sessionStorage) // 이 줄을 사용하면 sessionStorage에 저장됨
      }
    ),
    {
      name: 'commoncode-manager-store-devtools',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);