import { defineStore } from "pinia";
import { AxiosResponse } from "axios";
import storage from "../../utils/goodStorageUtil";
import userApi, { UserInfo } from "../../api/UserApi";

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
  },
  actions: {
    async login(username: string, password: string) {
      const loginUser = { username, password } as UserInfo;
      const userInfo: AxiosResponse<UserInfo> = await userApi.login(loginUser);
      this.userinfo = userInfo.data;
      storage.set("loginUser", userInfo.data);
      storage.set("token", userInfo.data.token);
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
