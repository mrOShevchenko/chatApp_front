import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import websocket from "./websocket";
import firebaseMessaging from './firebase';
import setupInterceptors from './services/interceptors';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from './plugins/font-awesome';
import VueNativeSock from 'vue-native-websocket-vue3';

const app = createApp(App)
    .use(router)
    .use(store)
    .use(VueNativeSock, websocket.url, websocket.options)
    .component("font-awesome-icon", FontAwesomeIcon)

app.config.globalProperties.$messaging = firebaseMessaging;

app.mount("#app");

setupInterceptors(store);