import store from "..";

const ctgyGettersTarget = {
  getFirstCtgyList: [],
  getSecondCtgyList: [],
};

const ctgyGettersProxy = new Proxy(ctgyGettersTarget, {
  get(target, key) {
    if (key === "getFirstCtgyList") {
      return store.getters["ctgyModule/getFirstCtgyList"];
    } else if (key === "getSecThrdCtgyList") {
      return store.getters["ctgyModule/getSecThrdCtgyList"];
    }
  },
});

export { ctgyGettersProxy };
