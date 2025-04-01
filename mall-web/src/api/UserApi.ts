import request from "../utils/axiosUtil";
export type UserInfo = {
  userid: number;
  username: string;
  password: string;
  address: string;
  valid: number;
  token?: string;
};
class UserApi {
  static api: UserApi = new UserApi();
  login(userInfo: UserInfo) {
    return request.post(`userinfomodule/login`, false, userInfo);
  }
  getEmailCode(email: string) {
    return request.post(`userinfomodule/sendVerificationCode`, false, {
      email,
    });
  }
}

export default UserApi.api;
