import request from "../utils/axiosUtil";

class ReplyApi {
  static api: ReplyApi = new ReplyApi();
  addReply(reply: any) {
    return request.post(`/replymodule/addReply`, false, reply);
  }
}
export default ReplyApi.api;
