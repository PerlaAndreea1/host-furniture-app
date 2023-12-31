import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from "./router/routes.js";

Vue.use(ElementUI);

new Vue({
  el: '#app',
  router, // Add the router to your Vue instance
  render: h => h(App)
});