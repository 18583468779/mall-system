import { createApp } from "vue";
import "./style.css";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import App from "./App.vue";
createApp(App).use(ElementPlus, { size: "small" }).mount("#app");
