import { ref } from "vue";
import evaluateStore from "../../../piniaStore/evaluate";
import userInfo from "../../../piniaStore/userInfo";
import { ElMessage } from "element-plus";
class ReplyClass {
  static endRplLstIdx = ref(2);
  static store = evaluateStore();
  static userStore = userInfo();
  static replycontent = ref(""); //回复的内容
  static addReply(replyEle: Event, reply: any) {
    if (ReplyClass.replycontent.value === "") {
      ElMessage({
        message: "回复内容不能为空",
        type: "warning",
      });
      return;
    }
    const rpl = {
      replycontent: ReplyClass.replycontent.value,
      evalid: reply.evaluateid,
      replyor: ReplyClass.userStore.storeLoginUser.username,
      strReplyDate: new Date().toLocaleDateString(),
    };
    ReplyClass.store.addReply(rpl);
    const replyPanelEle = replyEle.currentTarget!.parentElement!
      .parentElement! as HTMLBodyElement;
    replyPanelEle.className = "reply-panel";
  }

  static showReplylst(rplLst: any[], index: number) {
    return rplLst.slice(0, index);
  }
  static foldRplLst(rplLst: any[]) {
    ReplyClass.endRplLstIdx.value = rplLst.length;
  }

  static unfoldRplLst() {
    ReplyClass.endRplLstIdx.value = 2;
  }
  static isReadyCollapse(rplLst: any[]) {
    return ReplyClass.endRplLstIdx.value > 2 && rplLst.length > 2;
  }
  static isEmpty(rplLst: any[]) {
    return rplLst.length === 0;
  }
  static isReadyOpen(rplLst: any[]) {
    return ReplyClass.endRplLstIdx.value <= 2 && rplLst.length > 2;
  }
}

export default ReplyClass;
