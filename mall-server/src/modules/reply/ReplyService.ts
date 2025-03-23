import replyDao from "./ReplyDao";
import Reply from "../decormodel/reply";
import { combine } from "../commontypes";

class ReplyService {
  static replyService: ReplyService = new ReplyService();
  async addReply(reply: ReplyRaw) {
    const dbReply = await replyDao.addReply(reply);
    const lastNewReply = combine({ replyid: dbReply[0] }, reply);
    return lastNewReply;
  }
}
type ReplyRawKeys = "evalid" | "replycontent" | "strReplyDate" | "replyor";
export type ReplyRaw = Pick<Reply, ReplyRawKeys>;

export default ReplyService.replyService;
