import { Op } from "sequelize";
import { model } from "../definemodel";

class UserDaoDefine {
  static addUser(userinfo: Userinfo) {
    return model.create(userinfo); // 新增一个用户
  }
  static findAllUser() {
    return model.findAll({
      raw: true,
    }); // 查询所有用户
  }
  static findByProps() {
    return model.findAll({
      raw: true,
      attributes: ["username", "password"], // 只查询用户名和密码
    });
  }
  static findByUsmAndPsw(username: string, password: string) {
    return model.findOne({
      //查询用户名和密码
      raw: true,
      where: {
        [Op.and]: [{ username }, { password }],
      },
    });
  }
  static findByLike() {
    return model.findAll({
      raw: true,
      where: {
        username: {
          [Op.like]: "王%", //模糊查询
        },
      },
    });
  }
}
export const {
  addUser,
  findAllUser,
  findByProps,
  findByUsmAndPsw,
  findByLike,
} = UserDaoDefine;
export type Userinfo = {
  userid: number;
  username: string;
  psw: string;
  address: string;
  valid: number;
};
