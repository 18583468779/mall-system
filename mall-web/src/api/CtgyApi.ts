import request from "../utils/axiosUtil";

class CtgyAPI {
  static api: CtgyAPI = new CtgyAPI();
  getFirstCtgyList() {
    return request.get("/ctgymodule/findFirstCtgys", false);
  }
  getSecThrdCtgyList(firstCtgysId: number) {
    return request.get(`/ctgymodule/findSecThrdCtgys/${firstCtgysId}`, false);
  }
}
export default CtgyAPI.api;
