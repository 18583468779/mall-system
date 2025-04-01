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
    // 1. 提取非密码字段构建 OR 条件
    const orConditions = Object.keys(params)
      .filter((key) => key !== "password") // 正确过滤密码字段
      .map((key) => ({ [key]: params[key as keyof FindUserParams] }));

    // 2. 构建完整 WHERE 子句
    const whereClause: any = {};
    if (orConditions.length > 0) {
      whereClause[Op.or] = orConditions;
    }
    if (params.password) {
      whereClause.password = params.password;
    }

    return model.findOne({
      raw: true,
      where: whereClause,
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
