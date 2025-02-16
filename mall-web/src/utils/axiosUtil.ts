import axios, { AxiosInstance } from "axios";
import { ElMessage } from "element-plus";

const SERVER_ERR = "请求服务器的网址错误或网络连接失败";
class AxiosUtil {
  static axiosUtil: AxiosUtil = new AxiosUtil();
  axiosInstance!: AxiosInstance;
  constructor() {}
  createAxiosInstance() {
    this.axiosInstance = axios.create({ timeout: 15000 });
  }
  // 1.请求开始之前的请求拦截器
  beforeReqIntercpt() {
    this.axiosInstance.interceptors.request.use((request) => {
      return request;
    });
  }
  // 2.数据响应之后的响应拦截器
  beforeResponseIntercpt() {
    this.axiosInstance.interceptors.response.use(
      (response) => {
        const { data, msg, code } = response.data;
        if (code === 200) return response.data;
        else if (code === 500) {
          ElMessage.error(`发生了错误${msg}`);
          return;
        } else {
          ElMessage.error(`发生了未知错误`);
          return;
        }
      },
      (err) => {
        ElMessage.error(SERVER_ERR);
      }
    );
  }
  // 3.发送请求给服务器
  sendRequest(options: any) {}

  // 4. 深入灵活应用ts完成请求method类型自动提示
  reqPrepare() {}
}
