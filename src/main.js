import "@/assets/scss/style.scss";

import { createApp } from "vue";
// import { createPinia } from "pinia";
import App from "./App.vue";
// import router from "@/router";
// const pinia = createPinia()

createApp(App)
         // .use(pinia)
         // .use(router)
         .mount("#app");
