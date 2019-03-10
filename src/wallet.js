import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Wallet from './components/wallet.vue';
import Handler from './components/Handler.vue';
import WalletCreation from './components/WalletCreation.vue';
import DeveloperMode from './components/DeveloperMode.vue';

import 'vuetify/dist/vuetify.min.css';

const routes = [
  { path: '/create-wallet', component: WalletCreation },
  { path: '/handler', component: Handler},
  { path: '/developer-mode', component: DeveloperMode }
];

const router = new VueRouter({
  routes // short for `routes: routes`
});


Vue.use(Vuetify, {
  iconfont: 'md',
});
Vue.use(VueRouter);

// eslint-disable-next-line no-new
new Vue({
  el: '#wallet',
  components: {
    Wallet,
  },
  render(h) {
    return h('wallet');
  },
  router,
});
