import { defineStore } from "pinia";
import { FirstCtgy, SecondCtgy, ThirdCtgy } from "./state";
import ctgyApi from "../../api/CtgyApi";
import { AxiosResponse } from "axios";
import goodStorage from "good-storage";
import Books from "../../piniaViews/books/service";

function hasProps(data: any) {
  if (Array.isArray(data)) {
    return Boolean(data.length);
  } else if (data.constructor === Object) {
    return Boolean(Object.getOwnPropertyNames(data).length);
  }
}
export const ctgyStore = defineStore("ctgyStore", {
  state: () => {
    return {
      firstCtgyList: [] as FirstCtgy[], // 存放所有的一级分类
      secondCtgyList: [] as SecondCtgy[], // 存放所有的二级分类
      thirdCtgyList: [] as ThirdCtgy[], // 存放二级分类对应的三级分类(展开后)
      subThirdCtgyList: [] as ThirdCtgy[], // 存放二级分类对应的三级分类（未展开）
      firstCtgy: {} as FirstCtgy, // 存放一级分类
      secondCtgy: {} as SecondCtgy, // 存在二级分类
      thirdCtgy: {} as ThirdCtgy, // 存放三级分类
      isReadyOpen: true, // 是否展开三级分类状态
    };
  },
  getters: {
    getFirstCtgyList(state) {
      return state.firstCtgyList;
    },
    getSecondCtgyList(state) {
      return state.secondCtgyList;
    },

    getThirdCtgyList(state): ThirdCtgy[] {
      // 获取三级分类列表（展开后）
      if (hasProps(state.thirdCtgyList)) {
        return state.thirdCtgyList;
      } else {
        state.thirdCtgyList = goodStorage.get("thirdCtgyList");
        return state.thirdCtgyList;
      }
    },
    getSubThirdCtgyList(state): ThirdCtgy[] {
      // 获取三级分类列表（收缩）
      if (hasProps(state.subThirdCtgyList)) {
        return state.subThirdCtgyList;
      } else {
        state.subThirdCtgyList = goodStorage.get("subThirdCtgyList");
        return state.subThirdCtgyList;
      }
    },
    getFirstCtgy(state): FirstCtgy {
      // 获取一级分类
      return goodStorage.get("firstCtgy") || state.firstCtgy;
    },
    getSecondCtgy(state): SecondCtgy {
      // 获取二级分类
      return goodStorage.get("secondCtgy") || state.secondCtgy;
    },
    getThirdCtgy(state): ThirdCtgy {
      // 获取三级分类
      if (hasProps(state.thirdCtgy)) {
        return state.thirdCtgy;
      } else {
        state.thirdCtgy = goodStorage.get("thirdCtgy");
        return state.thirdCtgy;
      }
    },
    getIsReadyOpen(state) {
      return state.isReadyOpen;
    },
  },
  actions: {
    findAllCtgys() {
      return ctgyApi.getfindAllCtgys(); 
    },
    storeFirstCtgy(firstCtgy: FirstCtgy) {
      // 保存选中一级分类
      this.firstCtgy = firstCtgy;
      goodStorage.set("firstCtgy", firstCtgy);
    },
    storeSecondCtgy(secondCtgy: SecondCtgy) {
      // 保存选中二级分类
      this.secondCtgy = secondCtgy;
      goodStorage.set("secondCtgy", secondCtgy);
    },
    storeThirdCtgy(thirdCtgy: ThirdCtgy) {
      // 保存选中三级分类
      this.thirdCtgy = thirdCtgy;
      goodStorage.set("thirdCtgy", thirdCtgy);
    },
    storeThirdCtgyList(thirdCtgyList: ThirdCtgy[]) {
      // 保存选中三级分类列表（展开后）
      // 设置选中三级分类属性
      const newList = this.handleThirdCtgyList(thirdCtgyList);
      this.thirdCtgyList = newList;
      goodStorage.set("thirdCtgyList", newList);
    },
    storeSubThirdCtgyList(subThirdCtgyList: ThirdCtgy[]) {
      // 保存选中三级分类列表（未展开）
      const newList = this.handleThirdCtgyList(subThirdCtgyList);
      this.subThirdCtgyList = newList;
      goodStorage.set("subThirdCtgyList", newList);
    },
    storeIsReadyOpen(isReadyOpen: boolean) {
      this.isReadyOpen = isReadyOpen;
    },
    handleThirdCtgyList(thirdCtgyList: ThirdCtgy[]) {
      //处理三级分类列表是否选中的方法
      const newList = thirdCtgyList.map((item) => {
        if (item.thirdctgyid === this.getThirdCtgy.thirdctgyid) {
          item["isSelected"] = true;
        } else {
          item["isSelected"] = false; // 初始未选中
        }
        return item;
      });
      return newList;
    },
    handleThirdCtgyListSelected(thirdCtgy: ThirdCtgy) {
      // 切换选择三级分类
      const tCtgyList = this.getThirdCtgyList.map((item) => {
        if (item.thirdctgyid === thirdCtgy.thirdctgyid) {
          item.isSelected = true;
        } else {
          item.isSelected = false;
        }
        return item;
      });
      const tSubCtgyList = this.getSubThirdCtgyList.map((item) => {
        if (item.thirdctgyid === thirdCtgy.thirdctgyid) {
          item.isSelected = true;
        } else {
          item.isSelected = false;
        }
        return item;
      });
      this.thirdCtgy = thirdCtgy;
      this.thirdCtgyList = tCtgyList;
      this.subThirdCtgyList = tSubCtgyList;
      goodStorage.set("thirdCtgyList", tCtgyList);
      goodStorage.set("subThirdCtgyList", tSubCtgyList);
      goodStorage.set("thirdCtgy", thirdCtgy);
    },
    async handleSelectAll() {
      // 选择全部三级分类
      const thirdCtgy = [...this.getThirdCtgyList].map((item) => {
        item["isSelected"] = false;
        return item;
      });
      const subThirdCtgy = [...this.getSubThirdCtgyList].map((item) => {
        item["isSelected"] = false;
        return item;
      });
      const AllCtgy = {
        thirdctgyid: 0,
        thirdctgyname: "全部",
        isSelected: true,
      };
      this.thirdCtgy = AllCtgy;
      this.thirdCtgyList = thirdCtgy;
      this.subThirdCtgyList = subThirdCtgy;
      goodStorage.set("thirdCtgyList", thirdCtgy);
      goodStorage.set("subThirdCtgyList", subThirdCtgy);
      goodStorage.set("thirdCtgy", AllCtgy);
      await Books.findBooksBySecondCtgyId();
    },
    async findFirstCtgyList() {
      const result = await ctgyApi.getFirstCtgyList();
      this.firstCtgyList = result.data;
    },
    async findSecThrdCtgy(firstCtgyId: number) {
      const result: AxiosResponse<SecondCtgy[]> =
        await ctgyApi.getSecThrdCtgyList(firstCtgyId);
      result.data = result.data.map((s) => {
        s.isReadyOpen = true;
        s.subThirdctgys = s.thirdctgys.slice(0, 5);
        return s;
      });
      this.secondCtgyList = result.data;
    },
  },
});
