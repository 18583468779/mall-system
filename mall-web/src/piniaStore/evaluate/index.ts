import { defineStore } from "pinia";
import { AxiosResponse } from "axios";
import storage from "../../utils/goodStorageUtil";
import evaluateApi from "../../api/EvaluateApi";
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
