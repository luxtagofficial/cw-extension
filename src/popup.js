import Vue from 'vue';
import Popup from './components/popup.vue';

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
