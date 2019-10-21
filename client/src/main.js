import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import { sync } from "vuex-router-sync";
import "material-design-icons/iconfont/material-icons.css";
import VueDisqus from "vue-disqus";
import VueMoment from "vue-moment";
import VTooltip from "v-tooltip";
import Ripple from "vue-ripple-directive";
import Chartkick from "vue-chartkick";
import Chart from "chart.js";

Vue.use(Chartkick.use(Chart));

Vue.use(Ripple);

Vue.use(VTooltip);

Vue.use(Vuetify);
Vue.use(VueDisqus);
Vue.use(VueMoment);

Vue.config.productionTip = false;

sync(store, router);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
