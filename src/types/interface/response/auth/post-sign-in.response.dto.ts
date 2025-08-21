import ResponseDto from "../response.dto";

export default interface SignInResponseDto extends ResponseDto {
  tokenKey: string;
  roleCd: string;
  expiresIn: number;
}