import Vue from 'vue';
import Vuetify from 'vuetify';
import Popup from './components/popup.vue';

import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
  iconfont: 'md',
});

// eslint-disable-next-line no-new
new Vue({
  el: '#popup',
  components: {
    Popup,
  },
  render(h) {
    return h('popup');
  },
});
