import { ref } from "vue";

class ReplyClass {
  static endRplLstIdx = ref(2);
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
