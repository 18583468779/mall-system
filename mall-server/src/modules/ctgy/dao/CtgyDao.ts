import { findSecThrdCtgysByFstCtgyId } from "../../../modules/ctgy/defmodel/OneToMany";
class CtgyDao {
  static ctgyDao: CtgyDao = new CtgyDao();

  async findSecThrdCtgys(firstctgyid: number) {
    return await findSecThrdCtgysByFstCtgyId(firstctgyid);
  }
}

export default CtgyDao.ctgyDao;
