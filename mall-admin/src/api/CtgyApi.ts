import request from "../utils/axiosUtil";

class CtgyAPI {
  static api: CtgyAPI = new CtgyAPI();
  getAllCtgyList() {
    return request.get("/ctgymodule/findAllCtgys", false);
  }
}
export default CtgyAPI.api;
