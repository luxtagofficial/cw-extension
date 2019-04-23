/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/**
 * Copyright (C) 2019 Contributors as noted in the AUTHORS file
 *
 * This file is part of nem2-wallet-browserextension.
 *
 * nem2-wallet-browserextension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * nem2-wallet-browserextension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with nem2-wallet-browserextension.  If not, see <http://www.gnu.org/licenses/>.
 */
import getAccountInfo from '../components/utils/getAccountInfo';

const state = {
  accountInfo: false,
  loading_getAccountInfo: false,
};

const getters = {
  GET_ACCOUNT_INFO() {
    return state.accountInfo;
  },
};

const mutations = {
  setAccountInfo(state, accountInfo) {
    state.accountInfo = accountInfo;
  },
  setLoading_getAccountInfo(state, bool) {
    state.loading_getAccountInfo = bool;
  },
};

const actions = {
  async FETCH_ACCOUNT_INFO({ commit, dispatch }, wallet) {
    commit('setLoading_getAccountInfo', true);
    dispatch('application/RESET_ERRORS', null, { root: true });
    try {
      const accountInfo = await getAccountInfo(wallet);
      commit('setAccountInfo', accountInfo);
    } catch (error) {
      dispatch('application/SET_ERROR', error, { root: true });
      // eslint-disable-next-line no-console
      console.error(error, 'FETCH_ACCOUNT_INFO');
    }
    commit('setLoading_getAccountInfo', false);
  },
  async CLEAR_ACCOUNT_INFO({ commit }) {
    commit('setAccountInfo', false);
    commit('setLoading_getAccountInfo', false);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
