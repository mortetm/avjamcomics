import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import { createHead } from "unhead";

const pinia = createPinia();
const app = createApp(App);
const head = createHead();
app.use(pinia);
app.use(head);
app.use(router).mount("#app");
