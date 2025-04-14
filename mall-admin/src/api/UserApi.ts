import request from "../utils/axiosUtil";
import type { UserInfo } from "../views/login.vue";

class UserAPI {
  static api: UserAPI = new UserAPI();

  login(userInfo: UserInfo) {
    let params = {
      type:'account',
      identifier:userInfo.username,
      password:userInfo.password,
    }
    return request.post("/userinfomodule/login", false, params);
  }
  register(userInfo: UserInfo) {
    return request.post("/userinfomodule/register", false, userInfo);
  }
}
export default UserAPI.api;
