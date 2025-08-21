import { ICommonCodeItem } from "@/types/interface/object";
import ResponseDto from "../response.dto";

export default interface GetCommonCodeListResponseDto extends ResponseDto {
  commonCodeList: ICommonCodeItem[];
}