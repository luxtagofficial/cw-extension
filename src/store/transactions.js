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
import getAccountTransactionsById from '../components/utils/getAccountTransactionsById';
import { removeDuplicatesAndSortByBlockNumber } from '../components/utils/formatTransactions';
// To move to a more appropriate place


const state = {
  transactions: false,
  loading_getAccountTransactionsById: false,
};

const getters = {
  GET_TRANSACTIONS() {
    return state.transactions;
  },
  GET_FIRST_TRANSACTION() {
    return state.transactions[0];
  },
};

const mutations = {
  setAccountTransactions(state, accountTransactions) {
    state.transactions = accountTransactions;
  },
  setLoading_getAccountTransactionsById(state, bool) {
    state.loading_getAccountTransactionsById = bool;
  },
  clearTransactons(state) {
    state.transactons = false;
  },
};

const actions = {
  async ERASE_TRANSACTIONS({ commit }) {
    commit('setAccountTransactions', false);
    commit('setLoading_getAccountTransactionsById', false);
  },
  async GET_TRANSACTIONS_BY_ID({ commit, dispatch, getters }, { wallet, mode }) {
    await commit('setLoading_getAccountTransactionsById', true);
    let currentId;
    try {
      switch (mode) {
      case 'more':
        // eslint-disable-next-line no-case-declarations
        const actualTtransactions = getters.GET_TRANSACTIONS;
        currentId = actualTtransactions && actualTtransactions.length > 0
          ? actualTtransactions[actualTtransactions.length - 1].id
          : undefined;
        break;
      case 'init':
      case 'refresh':
      default:
        currentId = undefined;
        break;
      }

      if (mode === 'init') await commit('clearTransactons');

      const newTransactions = await getAccountTransactionsById(
        wallet,
        currentId,
      );

      const oldTransactions = getters.GET_TRANSACTIONS || [];

      await commit('setAccountTransactions', removeDuplicatesAndSortByBlockNumber([
        ...oldTransactions,
        ...newTransactions,
      ]));
    } catch (error) {
      dispatch('application/SET_ERROR', error, { root: true });
      console.error(error, 'GET_TRANSACTIONS_BY_ID');
    }

    commit('setLoading_getAccountTransactionsById', false);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
