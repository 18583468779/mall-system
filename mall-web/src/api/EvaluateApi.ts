import request from "../utils/axiosUtil";

class EvaluateApi {
  static api: EvaluateApi = new EvaluateApi();
  getFirstCtgyList(isbn: string) {
    return request.get(`/evaluatemodule/findEvaluateReplyList/${isbn}`, false);
  }
}
export default EvaluateApi.api;
