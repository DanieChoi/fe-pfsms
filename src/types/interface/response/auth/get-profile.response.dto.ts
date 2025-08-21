import ResponseDto from "../response.dto";

export default interface GetProfileResponseDto extends ResponseDto {
  nationCd: string;
  nickname: string;
  email: string;
  proFileImageUrl: string;
}