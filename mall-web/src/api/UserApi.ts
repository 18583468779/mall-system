import request from "../utils/axiosUtil";
export type UserInfo = {
  userid: number;
  username?: string;
  password: string;
  address: string;
  valid: number;
  code?: string;
  email?: string;
  token?: string;
};
class UserApi {
  static api: UserApi = new UserApi();
  login(type: string, userInfo: UserInfo) {
    return request.post(`userinfomodule/login`, false, { type, ...userInfo });
  }
  getEmailCode(email: string) {
    return request.post(`userinfomodule/sendVerificationCode`, false, {
      email,
    });
  }
}

export default UserApi.api;
