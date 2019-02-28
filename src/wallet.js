import Vue from 'vue';
import Wallet from './components/wallet.vue';

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
