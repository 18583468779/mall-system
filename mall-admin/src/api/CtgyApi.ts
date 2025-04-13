import request from "../utils/axiosUtil";

export enum CtgyType {
  first = 1, // 一级分类
  second = 2, // 二级分类
  third = 3, // 三级分类
}

class CtgyAPI {
  static api: CtgyAPI = new CtgyAPI();
  getAllCtgyList() {
    return request.get("/ctgymodule/findAllCtgys", false);
  }
  findSecCtgys() {
    return request.get("/ctgymodule/findSecCtgys", false);
  }
  addCtgys(type: CtgyType, name: string, parentId?: number) {
    let params = { type, name, id: parentId };
    return request.post("/ctgymodule/addCtgys", false, params);
  }
}
export default CtgyAPI.api;
