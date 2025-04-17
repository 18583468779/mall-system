import { ref } from "vue";
import BookApi from "../../api/BookApi";

class Service {
  static tableData = ref<Array<Record<string, any>>>([]);
  static tablePageData = ref<Record<string, any>>({});
  static async init() {
    // 初始化数据
  }
  static async getTableData() {
    // 模拟异步请求数据
    let page = 1; // 页码
    let pageSize = 10; // 每页显示的条数
    let res: any = await BookApi.findBooksByPage({ page, pageSize });
    if (res.code === 200) {
      Service.tableData.value = res.data.data;
      Service.tablePageData.value = {
        currentPage: res.data.currentPage,
        total: res.data.total,
        totalPages: res.data.totalPages,
      };
    }
  }

  static async saveBooks(data: any) {
    let res: any = await BookApi.saveBooks(data);
    return res;
  }
}

export default Service;
