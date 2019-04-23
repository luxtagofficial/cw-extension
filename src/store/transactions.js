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
import getAccountTransactionsById from '../infrastructure/transactions/getAccountTransactionsById';
import { removeDuplicatesAndSortByBlockNumber } from '../infrastructure/transactions/formatTransactions';
// To move to a more appropriate place


const state = {
  transactions: false,
  loading_getAccountTransactionsById: false,
};

const getters = {
  GET_TRANSACTIONS(state, getters, rootState) {
    return state.transactions[rootState['wallet/activeWallet.name']];
  },
  GET_FIRST_TRANSACTION() {
    return state.transactions[0];
  },
};

const mutations = {
  setAccountTransactions(state, { wallet, transactions }) {
    if (!state.transactions) state.transactions = {};
    state.transactions[wallet.name] = transactions;
  },
  setLoading_getAccountTransactionsById(state, bool) {
    state.loading_getAccountTransactionsById = bool;
  },
  clearTransactons(state, wallet) {
    state.transactons[wallet.name] = false;
  },
};

const actions = {
  async CLEAR_TRANSACTIONS({ commit }, wallet) {
    commit('setAccountTransactions', { wallet, transactions: false });
  },
  async GET_TRANSACTIONS_BY_ID({ commit, dispatch, getters }, { wallet, mode }) {
    await commit('setLoading_getAccountTransactionsById', true);
    const actualTransactions = getters.GET_TRANSACTIONS;
    let currentId;
    try {
      switch (mode) {
      case 'more':
        // eslint-disable-next-line no-case-declarations
        currentId = actualTransactions && actualTransactions.length > 0
          ? actualTransactions[actualTransactions.length - 1].id
          : undefined;
        break;
      case 'init':
        currentId = typeof actualTransactions === 'undefined'
          ? undefined : actualTransactions[actualTransactions.length - 1];
        break;
      case 'refresh':
      default:
        currentId = undefined;
        break;
      }

      const newTransactions = await getAccountTransactionsById(
        wallet,
        currentId,
      );

      const oldTransactions = getters.GET_TRANSACTIONS || [];

      await commit('setAccountTransactions', {
        wallet,
        transactions: removeDuplicatesAndSortByBlockNumber([
          ...oldTransactions,
          ...newTransactions,
        ]),
      });
    } catch (error) {
      dispatch('application/SET_ERROR', error, { root: true });
      // eslint-disable-next-line no-console
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
