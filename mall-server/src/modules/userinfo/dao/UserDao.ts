import { Op, Sequelize } from "sequelize";
import { model } from "../defmodel";
class UserDao {
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
  static findByLike(key: string) {
    return model.findAll({
      raw: true,
      where: {
        username: {
          [Op.like]: `${key}%`, //模糊查询
        },
      },
    });
  }
  static findByUsmAndAddr(username: string, address: string) {
    // 模糊查询，姓名或者地址
    return model.findAll({
      raw: true,
      where: {
        [Op.or]: [
          {
            username: {
              [Op.like]: `%${username}%`,
            },
          },
          {
            address: {
              [Op.like]: `%${address}%`,
            },
          },
        ],
      },
    });
  }
  static countUserinfo() {
    // address分组获取有效的数量
    return model.findAll({
      raw: true,
      group: "address",
      attributes: [
        "address",
        [Sequelize.fn("count", Sequelize.col("valid")), "totalCount"],
      ],
      where: {
        valid: 1,
      },
    });
  }
  static findUserWithPager(offset: number, pageSize: number) {
    // 分页查询
    return model.findAll({
      raw: true,
      limit: pageSize,
      offset,
    });
  }
}
export const {
  addUser,
  findAllUser,
  findByProps,
  findByUsmAndPsw,
  findByLike,
  findByUsmAndAddr,
  countUserinfo,
  findUserWithPager,
} = UserDao;
export type Userinfo = {
  userid: number;
  username: string;
  psw: string;
  address: string;
  valid: number;
};
