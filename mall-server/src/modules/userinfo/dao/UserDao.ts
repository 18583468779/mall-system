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
    console.log("whereClause", whereClause);
    return model.findOne({
      raw: true,
      where: whereClause,
    });
  }
  static async createUser(userinfo: Userinfo) {
    try {
      return await model.create({
        ...userinfo,
        returning: true,
        valid: userinfo.valid ?? 1, // 默认激活状态
        created_at: Sequelize.fn("NOW"),
      });
    } catch (error: any) {
      // 处理唯一约束冲突（如邮箱重复注册）
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new Error("该邮箱已被注册");
      }
      throw error;
    }
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
