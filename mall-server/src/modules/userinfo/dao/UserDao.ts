import { Op, Sequelize } from "sequelize";
import model from "../../../modules/decormodel/Userinfo";
import RoleModel from "../../../modules/decormodel/role";
interface FindUserParams {
  userid?: number;
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
  roleId?: number;
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
      nest: true, // 嵌套查询
      where: whereClause,
      include: [
        {
          model: RoleModel, // 关联角色表，假设角色表名为 'role'，关联字段名为 'roleId'
          as: "role",
          attributes: ["roleName", "permissions"], // 暴露需要的角色字段
        },
      ],
      attributes: {
        exclude: ["password", "weixin_openid", "roleId"], // 排除敏感字段
      },
    });
  }
  static async createUser(userinfo: Userinfo) {
    try {
      return await model.create({
        ...userinfo,
        roleId: userinfo.roleId || 1, // 显式设置默认角色
        valid: userinfo.valid ?? 1, // 默认激活状态
      } as any);
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

  // 根据角色查询用户
  static findUsersByRole(roleId: number) {
    return model.findAll({
      where: { roleId },
      include: [RoleModel],
    });
  }
}
export const {
  findOneUser,
  createUser,
  findAllUser,
  updateUser,
  findUsersByRole,
} = UserDao;
