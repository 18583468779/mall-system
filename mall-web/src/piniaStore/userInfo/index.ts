import { defineStore } from "pinia";
import { AxiosResponse } from "axios";
import storage from "../../utils/goodStorageUtil";
import userApi, { UserInfo } from "../../api/UserApi";
import router from "../../router";

export default defineStore("userStore", {
  state: () => {
    return initState;
  },
  getters: {
    storeLoginUser: (state): UserInfo => {
      return hasProps(state.userinfo)
        ? state.userinfo
        : storage.get("loginUser");
    },
    getRoleInfo: (state) => {
      return (
        (state.userinfo.role || storage.get("loginUser")?.role)?.permissions ===
          2 ||
        (state.userinfo.role || storage.get("loginUser")?.role)?.permissions ===
          0
      );
    },
  },
  actions: {
    async login(
      type: string,
      username: string,
      password: string,
      code: string
    ) {
      let params: any = {};
      if (type === "email") {
        params = { identifier: username, code };
      } else if (type === "account") {
        params = { identifier: username, password };
      }
      const userInfo: AxiosResponse<UserInfo> = await userApi.login(
        type,
        params
      );
      this.userinfo = userInfo.data;
      storage.set("loginUser", userInfo.data);
      storage.set("token", userInfo.data.token);
    },
    async setUserInfo() {
      let userinfo = this.storeLoginUser;
      const userInfo: AxiosResponse<UserInfo> = await userApi.getUserInfo(
        userinfo.userid
      );
      this.userinfo = userInfo.data;
      storage.set("loginUser", userInfo.data);
    },
    logout() {
      router.push("/login");
      this.userinfo = {} as UserInfo;
      localStorage.removeItem("loginUser");
      localStorage.removeItem("token");
    },
    async sendCode(email: string) {
      const code: AxiosResponse<string> = await userApi.getEmailCode(email);
      return code.data;
    },
  },
});

const initState: InitUserState = {
  userinfo: {} as UserInfo,
};

type InitUserState = {
  userinfo: UserInfo;
};

export function hasProps(data: any) {
  if (Array.isArray(data)) {
    return Boolean(data.length);
  } else if (data.constructor === Object) {
    return Boolean(Object.getOwnPropertyNames(data).length);
  }
}
