import { Op, Sequelize } from "sequelize";
import { model } from "../defmodel";
interface FindUserParams {
  username?: string;
  email?: string;
  phone?: string;
  weixin_openid?: string;
  password?: string;
}

export type Userinfo = {
  userid?: number;
  username?: string;
  password?: string;
  email?: string;
  phone?: string;
  weixin_openid?: string;
  address?: string;
  valid?: number;
  token?: string;
};

class UserDao {
  static findOneUser(params: FindUserParams) {
    return model.findOne({
      raw: true,
      where: {
        [Op.or]: Object.keys(params)
          .filter(([key]) => key !== "password")
          .map(([key, value]) => ({ [key]: value })),
        ...(params.password && { psw: params.password }),
      },
    });
  }
  static createUser(userinfo: Userinfo) {
    return model.create(userinfo); // 新增一个用户
  }
  static findAllUser() {
    return model.findAll({
      raw: true,
    }); // 查询所有用户
  }
  // 更新用户信息
  static updateUser(
    whereParams: Partial<Userinfo>,
    updateParams: Partial<Userinfo>
  ) {
    return model.update(updateParams, { where: whereParams });
  }
}
export const { findOneUser, createUser, findAllUser, updateUser } = UserDao;
