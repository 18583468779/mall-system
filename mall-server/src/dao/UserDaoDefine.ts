import { model } from "../definemodel";

class UserDaoDefine {
  static addUser(userinfo: Userinfo) {
    return model.create(userinfo);
  }
}
export const { addUser } = UserDaoDefine;
export type Userinfo = {
  userid: number;
  username: string;
  psw: string;
  address: string;
  valid: number;
};
