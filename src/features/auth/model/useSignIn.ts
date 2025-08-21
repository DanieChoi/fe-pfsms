import { useState } from 'react';

import { loginApi, availableMenuApi } from '@/shared/api';
import { User } from '@/types/interface/object'
import { getProfileApi, saveAuthToken } from '@/shared/api/auth';
import { useAuthStore } from '@/shared/store';
import { PostSignInRequestDto } from '@/types/interface/request/auth';
import { ResponseCode } from '@/types/enum';
import { headerMenus } from '@/shared/config';

export const useSignIn = () => {
  const [error, setError] = useState<string | null>(null);
  const { login: setAuthState, setLoading, isLoading } = useAuthStore();

  const login = async (credentials: PostSignInRequestDto) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginApi(credentials);

      if (response.rtnCode !== ResponseCode.SUCCESS) {
        throw new Error(response.rtnMessage || '로그인에 실패했습니다.');
      };

      // ###### 로그인 시간 기준으로 세션키 만료시간 설정 ######
      const currentDate = new Date();
      const expiredDate = new Date(currentDate.getTime() + response.expiresIn * 1000); // 초 더하기
      
      response.expiresIn = expiredDate.getTime(); // 만료일시를 밀리세컨드로 변환하여 저장

      // 토큰 저장
      saveAuthToken(response.tokenKey);

      const resProfile = await getProfileApi();

      if (resProfile.rtnCode !== ResponseCode.SUCCESS) {
        throw new Error(resProfile.rtnMessage || '사용자 프로필 정보 가져오기에 실패했습니다.');
      };

      // 사용자 정보 변환 및 저장
      const user: User = {
        loginId: credentials.loginId,
        nationCd: resProfile.nationCd,
        email: resProfile.email,
        nickname: resProfile.nickname,
        profileImage: resProfile.proFileImageUrl,
        tokenKey: response.tokenKey
      };

      const resAvailableMenu = await availableMenuApi('MNU000');

      if (resAvailableMenu.rtnCode !== ResponseCode.SUCCESS) {
        throw new Error(resAvailableMenu.rtnMessage || '사용 가능한 메뉴 가져오기에 실패했습니다.');
      };

      // console.log('사용가능 메뉴:', resAvailableMenu.listAvailableMenus);

      // Zustand 스토어에 인증 정보 저장
      setAuthState(user, resAvailableMenu.listAvailableMenus, headerMenus(resAvailableMenu.listAvailableMenus), response.tokenKey);

      console.log('로그인 성공:', response.rtnMessage);
      return { success: true, user };
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      const errorMessage = error.response?.data?.message || error.message || '로그인 중 오류가 발생했습니다.';
      setError(errorMessage);
      console.error('로그인 실패:', errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
    clearError: () => setError(null)
  };
};
