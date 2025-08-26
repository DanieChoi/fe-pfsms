import { apiClient } from '@/shared/api';
import { GetCommonCodeListResponseDto } from '@/types/interface/response/system';

export const getCommonCodeSearchList = async (): Promise<GetCommonCodeListResponseDto> => {
  const endpoint = "/commoncode/list";
  const { data } = await apiClient.get<GetCommonCodeListResponseDto>(
    endpoint,
    { headers: { "Content-Type": "application/json", Accept: "application/json" } }
  );
  return data;
};
