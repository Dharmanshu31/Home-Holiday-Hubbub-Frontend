import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { router } from "./router/index";
import TheHeader from "./layout/ui/TheHeader.vue";
import TheFooter from "./layout/ui/TheFooter.vue";
import Loader from "./components/Loader.vue";
import store from "./store";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.use(store);
app.component("TheHeader", TheHeader);
app.component("TheFooter", TheFooter);
app.component("Loader", Loader);

app.mount("#app");
