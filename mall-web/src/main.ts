import { createApp } from "vue";
import "./style.css";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import App from "./App.vue";
import store from "./store/index";
import router from "./router";
import "./reset.css";
import { createPinia } from "pinia";
createApp(App)
  .use(ElementPlus, { size: "small" })
  .use(store)
  .use(createPinia())
  .use(router)
  .mount("#app");
