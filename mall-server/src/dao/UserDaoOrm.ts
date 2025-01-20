import "./BaseDaoOrm";
import UserinfoModel from "../ormmodel/Userinfo";
class UserDaoOrm {
  static userDaoOrm: UserDaoOrm = new UserDaoOrm();
  findAllUser() {
    return UserinfoModel.findAll(); //返回所有用户
  }
}
export default UserDaoOrm.userDaoOrm;
