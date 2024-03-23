import { createApp } from "vue";
// Import Quasar
import { Dialog, Quasar } from "quasar";
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
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

const app = createApp(App);

// Quasar
app.use(Quasar, {
  plugins: {
    Dialog
  }
});
// Axios
app.provide("axios", axios);
// Use plugin with optional defaults
app.use(VCalendar, {})
app.use(createPinia());
app.use(router);
app.use(materialKit);
app.mount("#app");
