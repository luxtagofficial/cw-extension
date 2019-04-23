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
import { getNamespacesByAddress } from '../components/utils/getNamespacesByAddress';

const state = {
  namespaces: false,
  loading_getNamespacesByAddress: false,
};

const getters = {
  GET_NAMESPACES() {
    return state.namespaces;
  },
};

const mutations = {
  setAccountNamespaces(state, namespaces) {
    state.namespaces = namespaces;
  },
  setLoading_getNamespacesByAddress(state, bool) {
    state.loading_getNamespacesByAddress = bool;
  },
  clearNamespaces(state) {
    state.namespaces = false;
  },
};

const actions = {
  async ERASE_NAMESPACES({ commit }) {
    commit('setAccountNamespaces', false);
  },
  async GET_NAMESPACES_BY_ADDRESS({ commit, dispatch }, { wallet }) {
    await commit('setLoading_getNamespacesByAddress', true);
    try {
      await dispatch('ERASE_NAMESPACES');
      const namespaces = await getNamespacesByAddress(wallet);
      commit('setAccountNamespaces', namespaces);
    } catch (error) {
      dispatch('application/SET_ERROR', error, { root: true });
      // eslint-disable-next-line no-console
      console.error(error, 'ERASE_NAMESPACES');
    }
    commit('setLoading_getNamespacesByAddress', false);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
