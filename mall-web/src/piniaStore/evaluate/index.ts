import { defineStore } from "pinia";
import { AxiosResponse } from "axios";
import storage from "../../utils/goodStorageUtil";
import evaluateApi from "../../api/EvaluateApi";
export default defineStore("evaluateStore", {
  state: () => {
    return initState;
  },
  getters: {
    getEvalRplLst(state) {
      return state.evalRplLst || storage.get("evalRplLst");
    },
  },
  actions: {
    async findEvalRplLst(isbn: string) {
      const evalRplLst: AxiosResponse<any[]> =
        await evaluateApi.getFirstCtgyList(isbn);
      this.evalRplLst = evalRplLst.data;
      storage.set("evalRplLst", evalRplLst.data);
    },
  },
});

type EvalRplLst = {
  content: string;
  evaluator: string;
  isbn: any;
  headportrai: any;
  givealikenum: any;
  evaluatedegree: any;
  pubdate: any;
  isanonymous: any;
  evaluteid: any;
};

type initStateType = {
  evalRplLst: EvalRplLst[];
};
const initState: initStateType = {
  evalRplLst: [],
};
