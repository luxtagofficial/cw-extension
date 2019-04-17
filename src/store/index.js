import Vue from 'vue';
import Vuex from 'vuex';
import wallet from './wallet';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    wallet,
  },
  strict: debug,
});
