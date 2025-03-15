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
}

export default UserApi.api;
