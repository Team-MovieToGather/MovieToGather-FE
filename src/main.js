import { createApp } from "vue";
// Import Quasar
import { Quasar } from "quasar";
import { createPinia } from "pinia";
// Import Quasar Css
import "quasar/dist/quasar.css";

import App from "./App.vue";
import router from "./router";
// Import Axios
import axios from "axios";
// Nucleo Icons
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";


import materialKit from "./material-kit";

const app = createApp(App);

// Quasar
app.use(Quasar);
// Axios
app.provide("axios", axios);
app.use(createPinia());
app.use(router);
app.use(materialKit);
app.mount("#app");
