import { GetAvailableMenuResponseDto } from "@/types/interface/response/menu";
import { apiClient } from "./client";

export const availableMenuApi = async (
  upperMenuNo: string
): Promise<GetAvailableMenuResponseDto> => {
  const endpoint = '/menu/' + upperMenuNo + '/available-menus'; // prod: /backend/auth/login 로 프록시
  const { data } = await apiClient.get<GetAvailableMenuResponseDto>(
    endpoint,
    { headers: { "Content-Type": "application/json", Accept: "application/json" } }
  );
  return data;
};
