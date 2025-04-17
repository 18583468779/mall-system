import { ref } from "vue";
import ctgyApi, { CtgyType } from "../../api/CtgyApi.ts";

interface Category {
  [key: string]: any;
  children?: Category[];
}

class Service {
  static tableData = ref<Array<Record<string, any>>>([]);
  static firstSecondCtgys = ref<Array<Record<string, any>>>([]);
  static allCtgys = ref<Array<Record<string, any>>>([]);
  static async init() {
    // 初始化数据
    await Service.getTableData();
    await Service.findSecCtgys();
  }
  static async getTableData() {
    // 模拟异步请求数据
    let res: any = await ctgyApi.getAllCtgyList();
    if (res.code === 200) {
      Service.tableData.value = normalizeTree(res.data);
      Service.allCtgys.value = normalizeTree(res.data, "", "value", "label");
    }
  }
  static async resetCtgys() {
    await Service.getTableData();
    await Service.findSecCtgys();
  }
  static async findSecCtgys() {
    // 模拟异步请求数据
    let res: any = await ctgyApi.findSecCtgys();
    if (res.code === 200) {
      Service.firstSecondCtgys.value = normalizeTree(
        res.data,
        "",
        "value",
        "label"
      );
    }
  }
  static async addCtgys(type: CtgyType, name: string, parentId?: number) {
    // 模拟异步请求数据
    let res: any = await ctgyApi.addCtgys(type, name, parentId);
    if (res.code === 200) {
      await Service.resetCtgys();
    }
  }
  static async deleteCtgys(type: CtgyType, id: number) {
    // 模拟异步请求数据
    let res: any = await ctgyApi.deleteCtgys(type, id);
    if (res.code === 200) {
      await Service.resetCtgys();
      return res;
    }
  }
  static handleCtgys = (val: string): { type: CtgyType; id: string } => {
    console.log(111,val);
    let valArr = val.split("-");
    if (valArr.length === 1) {
      return { type: CtgyType.first, id: val };
    } else if (valArr.length === 2) {
      return { type: CtgyType.second, id: valArr[1] };
    } else {
      return { type: CtgyType.third, id: valArr[2] };
    }
  };
}

function normalizeTree(
  arr: Category[],
  parentFullId = "",
  id = "id",
  name = "name"
): Category[] {
  return arr.map((item) => {
    // 自动检测ID和名称字段
    const idKey = Object.keys(item).find((k) => /ctgy.*id/i.test(k)) || id;
    const nameKey =
      Object.keys(item).find((k) => /ctgy.*name/i.test(k)) || name;
    const childrenKey =
      Object.keys(item).find((k) => Array.isArray(item[k])) || "children";

    // 生成当前节点的完整ID
    const currentId = item[idKey].toString();
    const fullId = parentFullId ? `${parentFullId}-${currentId}` : currentId;

    // 构建标准化节点
    const node: Category = {
      [id]: fullId,
      [name]: item[nameKey],
      // 保留原始数据中的其他属性
      ...Object.fromEntries(
        Object.entries(item).filter(
          ([k]) => k !== idKey && k !== nameKey && k !== childrenKey
        )
      ),
    };

    // 递归处理子节点
    if (childrenKey && item[childrenKey]?.length) {
      node.children = normalizeTree(item[childrenKey], fullId, id, name);
    }

    return node;
  });
}

export default Service;
