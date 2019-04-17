import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import App from './components/App.vue';
import Home from './components/Home.vue';
import Handler from './components/Handler.vue';
import Send from './components/send/Send.vue';
import Namespace from './components/namespace/Namespace.vue';
import Asset from './components/asset/Asset.vue';
import Wallet from './components/wallet/Wallet.vue';
import DeveloperMode from './components/developermode/DeveloperMode.vue';
import About from './components/About.vue';
import store from './store';

import 'vuetify/dist/vuetify.min.css';

const routes = [
  { path: '/send', component: Send },
  { path: '/namespace', component: Namespace },
  { path: '/asset', component: Asset },
  { path: '/wallet', component: Wallet },
  { path: '/developer-mode', component: DeveloperMode },
  { path: '/handler', component: Handler },
  { path: '/about', component: About },
  { path: '/', component: Home },
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
  el: '#app',
  store,
  components: {
    App,
  },
  render(h) {
    return h('app');
  },
  router,
});
