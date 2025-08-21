import { apiClient } from "./client";
import { IHeaderMenuItem, IMenuItem, User } from "@/types/interface/object";
import { PostSignInRequestDto } from "@/types/interface/request/auth";
import { GetProfileResponseDto, PostSignInResponseDto } from "@/types/interface/response/auth";

// 로그인 API: JSON 전송
export const loginApi = async (
  credentials: PostSignInRequestDto
): Promise<PostSignInResponseDto> => {
  const endpoint = "/auth/sign-in";
  const { data } = await apiClient.post<PostSignInResponseDto>(
    endpoint,
    credentials,
    { headers: { "Content-Type": "application/json", Accept: "application/json" } }
  );
  return data;
};

// 프로파일 가져오기 API: JSON 전송
export const getProfileApi = async (): Promise<GetProfileResponseDto> => {
  const endpoint = "/auth/profile";
  const { data } = await apiClient.get<GetProfileResponseDto>(
    endpoint,
    { headers: { "Content-Type": "application/json", Accept: "application/json" } }
  );
  return data;
};

// 로그아웃 API: JSON 전송

// 로컬 스토리지 유틸
export const saveAuthToken = (tokenKey: string) => {
  if (typeof window !== "undefined") localStorage.setItem("authToken", tokenKey);
};
export const getAuthToken = (): string | null =>
  typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

export const saveUserInfo = (user: User) => {
  if (typeof window !== "undefined") localStorage.setItem("userInfo", JSON.stringify(user));
};
export const getUserInfo = (): User | null =>
  typeof window !== "undefined"
    ? (JSON.parse(localStorage.getItem("userInfo") as string) as User)
    : null;
export const clearUserInfo = () => {
  if (typeof window !== "undefined") localStorage.removeItem("userInfo");
};

export const saveAvailableMenu = (availableMenu: IMenuItem[]) => {
  if(typeof window !== "undefined") localStorage.setItem("availableMenu", JSON.stringify(availableMenu));
};
export const getAvailableMenu = (): IMenuItem[] | [] =>
  typeof window !== "undefined"
    ? (JSON.parse(localStorage.getItem("availableMenu") as string) as IMenuItem[])
    : [];
export const clearAvailableMenu = () => {
  if(typeof window !== "undefined") localStorage.removeItem("availableMenu");
};

export const saveHeaderMenus = (headerMenus: IHeaderMenuItem[]) => {
  if(typeof window !== "undefined") localStorage.setItem("headerMenu", JSON.stringify(headerMenus));
};
export const getHeaderMenus = (): IHeaderMenuItem[] | [] =>
  typeof window !== "undefined"
    ? (JSON.parse(localStorage.getItem("headerMenus") as string) as IHeaderMenuItem[])
    : [];
export const clearHeaderMenus = () => {
  if(typeof window !== "undefined") localStorage.removeItem("headerMenus");
};
