import { createApp } from "vue";
import "./style.css";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import App from "./App.vue";
import store from "./store/index";
import router from "./router";
import "./reset.css";
import { ImgUtil } from "./utils/imgUtil";
import "../assets/iconfont.css";
import { createPinia } from "pinia";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

ImgUtil.storageImaList();
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app
  .use(ElementPlus, { size: "small" })
  .use(store)
  .use(createPinia())
  .use(router)
  .mount("#app");
