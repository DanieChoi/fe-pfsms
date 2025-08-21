import { apiClient } from '@/shared/api';
import { GetCommonCodeListResponseDto } from '@/types/interface/response/system';

export const getCommonCodeSearchList = async (): Promise<GetCommonCodeListResponseDto> => {
  try {
    const endpoint = "/commoncode/list";
    const { data } = await apiClient.get<GetCommonCodeListResponseDto>(
      endpoint,
    );
    return data;
  } catch (error: Error | unknown) {
    const err = error as Error;
    throw err;
  }
};
