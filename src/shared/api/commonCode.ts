import { GetCommonCodeListResponseDto } from "@/types/interface/response/system";
import { apiClient } from "./client";

// 공통코드 리스트 불러오기 API: JSON 전송
export const getCommonCodeListApi = async (): Promise<GetCommonCodeListResponseDto> => {
  const endpoint = "/commoncode/list";
  const { data } = await apiClient.get<GetCommonCodeListResponseDto>(
    endpoint,
    { headers: { "Content-Type": "application/json", Accept: "application/json" } }
  );
  return data;
};
