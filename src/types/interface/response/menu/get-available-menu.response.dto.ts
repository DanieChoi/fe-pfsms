import { IMenuItem } from "@/types/interface/object";
import ResponseDto from "../response.dto";

export default interface GetAvailableMenuResponseDto extends ResponseDto {
  listAvailableMenus: IMenuItem[];
}