import store from "..";

export class CtgyActions {
  static async findFirstCtgyList() {
    await store.dispatch("ctgyModule/findFirstCtgyList");
  }
  static async findSecThrdCtgy(firstCtgyId: number) {
    await store.dispatch("ctgyModule/findSecThrdCtgy", firstCtgyId);
  }
}
