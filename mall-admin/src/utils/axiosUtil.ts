import axios, {
  type AxiosInstance,
  type AxiosPromise,
  type AxiosRequestConfig,
  type AxiosRequestHeaders,
} from "axios";
import { ElMessage } from "element-plus";
import conf from "../config";
import router from "../router";
const SERVER_ERR = "请求服务器的网址错误或网络连接失败";
interface AxiosRequestConfig_ extends AxiosRequestConfig {
  isMock: boolean;
  noAuth: boolean;
}

type Method = "get" | "post" | "put" | "delete" | "patch";

const methods: Method[] = ["get", "post", "put", "delete", "patch"];
type ReqFn = (
  url: string,
  isMock: boolean,
  data?: any,
  headers?: AxiosRequestHeaders | Record<string, any>,
  noAuth?: boolean
) => AxiosPromise<any>;
interface ReqExecute {
  get: ReqFn;
  post: ReqFn;
  put: ReqFn;
  delete: ReqFn;
  patch: ReqFn;
}
class AxiosUtil {
  static axiosUtil: AxiosUtil = new AxiosUtil();
  axiosInstance!: AxiosInstance;
  request!: ReqExecute;
  constructor() {
    this.request = {
      get: (): any => {},
      post: (): any => {},
      put: (): any => {},
      delete: (): any => {},
      patch: (): any => {},
    };
    this.createAxiosInstance();
    this.beforeReqIntercpt();
    this.beforeResponseIntercpt();
    this.reqPrepare();
  }
  createAxiosInstance() {
    this.axiosInstance = axios.create({ timeout: 15000 });
  }
  // 1.请求开始之前的请求拦截器
  beforeReqIntercpt() {
    this.axiosInstance.interceptors.request.use((request: any) => {
      // 检查是否需要跳过token
      if (request?.noAuth) {
        // 清除配置避免影响后续请求
        return request; // 直接返回不添加token
      }
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        const token = JSON.parse(userInfo).access_token;
        const headers = request.headers;
        if (!headers.authorization && token)
          headers.authorization = `Bearer ${token}`;
      }

      return request;
    });
  }
  // 2.数据响应之后的响应拦截器
  beforeResponseIntercpt() {
    this.axiosInstance.interceptors.response.use(
      (response) => {
        const { msg, code } = response.data;
        if (code === 200) return response.data;
        else if (code === 500) {
          ElMessage.error(`发生了错误${msg}`);
          return;
        } else if (code === 401) {
          localStorage.setItem("userInfo", "");
          ElMessage.error(`请重新登录！${msg}`);
          router.push({ name: "login" });
          throw new Error(msg);
        } else {
          ElMessage.error(`发生了未知错误`);
          return;
        }
      },
      (err) => {
        console.log(err);
        ElMessage.error(SERVER_ERR);
      }
    );
  }
  // 3.发送请求给服务器
  sendRequest(options: AxiosRequestConfig_) {
    if (conf.env === "production") {
      this.axiosInstance.defaults.baseURL = conf.baseApi;
    } else if (conf.env === "development") {
      const isMock: boolean = options.isMock || conf.isMock;
      this.axiosInstance.defaults.baseURL = isMock
        ? conf.mockBaseApi
        : conf.baseApi;
    }
    return this.axiosInstance(options); // 返回一个 AxiosPromise<any> 对象
  }

  // 4. 深入灵活应用ts完成请求method类型自动提示
  reqPrepare() {
    return methods.forEach((method) => {
      this.request[method] = (url, isMock, data, headers, noAuth) => {
        return this.sendRequest({
          url,
          isMock,
          method,
          data,
          headers: headers || {},
          noAuth: noAuth || false,
        });
      };
    });
  }
}

export default AxiosUtil.axiosUtil.request;
