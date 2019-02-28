import Vue from 'vue';
import Vuetify from 'vuetify';
import Wallet from './components/wallet.vue';

import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
  iconfont: 'md',
});

// eslint-disable-next-line no-new
new Vue({
  el: '#wallet',
  components: {
    Wallet,
  },
  render(h) {
    return h('wallet');
  },
});
