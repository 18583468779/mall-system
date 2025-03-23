import { defineStore } from "pinia";
import { AxiosResponse } from "axios";
import storage from "../../utils/goodStorageUtil";
import evaluateApi from "../../api/EvaluateApi";
import replyApi from "../../api/ReplyApi";
import bookStore from "../book";
export default defineStore("evaluateStore", {
  state: () => {
    return initState;
  },
  getters: {
    getBookIsbn() {
      return bookStore().getISBN;
    },
    getEvalRplLst(state) {
      return state.evalRplLst || storage.get("evalRplLst");
    },
  },
  actions: {
    async findEvalRplLst() {
      const evalRplLst: AxiosResponse<any[]> =
        await evaluateApi.getFirstCtgyList(this.getBookIsbn);
      this.evalRplLst = evalRplLst.data;
      storage.set("evalRplLst", evalRplLst.data);
    },

    async addReply(reply: any) {
      const result: AxiosResponse<any> = await replyApi.addReply(reply);
      const evalRplLst = this.getEvalRplLst;
      const arr = evalRplLst.map((evalRpl) => {
        if (evalRpl.evaluateid === reply.evalid) {
          evalRpl.replies.push(result.data);
        }
        return evalRpl;
      });
      this.evalRplLst = arr;
      storage.set("evalRplLst", arr);
    },
  },
});

export type EvalRplLst = {
  content: string;
  evaluator: string;
  isbn: any;
  headportrait: any;
  givealikenum: any;
  evaluatedegree: any;
  pubdate: any;
  isanonymous: any;
  evaluateid: any;
  replies: Array<any>;
};

type initStateType = {
  evalRplLst: EvalRplLst[];
  headAndDegree: boolean;
};
const initState: initStateType = {
  evalRplLst: [],
  headAndDegree: true,
};
