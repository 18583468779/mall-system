import { createApp } from "vue";
import "./style.css";
import "tailwindcss/tailwind.css";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia).use(ElementPlus).use(router);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
