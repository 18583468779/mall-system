import { createApp } from "vue";
import "./style.css";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import App from "./App.vue";
import store from "./store/index";

createApp(App).use(ElementPlus, { size: "small" }).use(store).mount("#app");
