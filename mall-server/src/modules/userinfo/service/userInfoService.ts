import jwt from "jsonwebtoken";
import { findOneUser, Userinfo } from "../dao/UserDao";
class UserService {
  static userService: UserService = new UserService();
  async login(username: string, password: string) {
    const userInfo: any = await findOneUser(username, password);
    this.createJWTToken(userInfo);
    return userInfo;
  }
  createJWTToken(userInfo: Userinfo) {
    const token = jwt.sign({ userInfo }, "aiaiai123456X", {
      expiresIn: "30h",
      header: { alg: "HS256", typ: "JWT" },
    });
    userInfo.token = token;
  }
}
export default UserService.userService;
