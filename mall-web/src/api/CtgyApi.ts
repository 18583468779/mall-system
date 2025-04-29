import request from "../utils/axiosUtil";

class CtgyAPI {
  static api: CtgyAPI = new CtgyAPI();
  getfindAllCtgys() {
    return request.get("/ctgymodule/findAllCtgys", false); 
  }
  getFirstCtgyList() {
    return request.get("/ctgymodule/findFirstCtgys", false);
  }
  getSecThrdCtgyList(firstCtgysId: number) {
    return request.get(`/ctgymodule/findSecThrdCtgys/${firstCtgysId}`, false);
  }
}
export default CtgyAPI.api;
