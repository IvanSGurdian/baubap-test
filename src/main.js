import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

const pinia = createPinia();

const mainApp = createApp(App);

mainApp.use(router).use(pinia);

mainApp.mount("#app");
