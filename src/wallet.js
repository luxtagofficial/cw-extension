import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Home from './components/home.vue';
import Handler from './components/Handler.vue';
import Wallet from './components/wallet/Wallet.vue';
import DeveloperMode from './components/developermode/DeveloperMode.vue';
import Send from './components/Send.vue';

import 'vuetify/dist/vuetify.min.css';

const routes = [
  { path: '/wallet', component: Wallet },
  { path: '/handler', component: Handler },
  { path: '/developer-mode', component: DeveloperMode },
  { path: '/send', component: Send },
];

const router = new VueRouter({
  routes, // short for `routes: routes`
});


Vue.use(Vuetify, {
  iconfont: 'md',
});
Vue.use(VueRouter);

// eslint-disable-next-line no-new
new Vue({
  el: '#home',
  components: {
    Home,
  },
  render(h) {
    return h('home');
  },
  router,
});
