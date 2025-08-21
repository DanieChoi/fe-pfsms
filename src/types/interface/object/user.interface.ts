export default interface User {
  loginId: string,
  nationCd: string,
  nickname: string,
  email: string,
  profileImage: string | null,
  tokenKey: string
}