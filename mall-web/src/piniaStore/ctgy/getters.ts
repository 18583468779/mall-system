import store from "..";

const ctgyGettersTarget = {
  getFirstCtgyList: [],
  getSecondCtgyList: [],
};

const ctgyGettersProxy = new Proxy(ctgyGettersTarget, {
  get(target, key) {
    if (key === "getFirstCtgyList") {
      return store.getters["ctgyModule/getFirstCtgyList"];
    } else if (key === "getSecondCtgyList") {
      return store.getters["ctgyModule/getSecondCtgyList"];
    }
  },
});

export { ctgyGettersProxy };
