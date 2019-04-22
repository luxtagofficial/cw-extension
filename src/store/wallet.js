/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
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

import {
  walletsToJSON,
  jsonToWallets,
} from '../infrastructure/wallet';

import { Wallet } from './wallet-types';

const state = {
  activeWallet: false,
  wallets: [],
};

/*
    this.state.activeWallet = this.state.wallets.length === 0 ? false : this.state.wallets[0];
*/

const getters = {
  GET_WALLETS() {
    return state.wallets;
  },
  GET_ACTIVE_WALLET() {
    return state.activeWallet;
  },
};

const mutations = {
  setActiveWallet(state, newActiveWallet) {
    state.activeWallet = newActiveWallet;
  },
  addWallet(state, newWallet) {
    state.wallets.push(newWallet);
  },
  addWalletsFromStorage(state, wallets) {
    state.wallets = wallets;
  },
};

const actions = {
  async INIT_APPLICATION({ dispatch, commit }) {
    const localStorageWallets = localStorage.getItem('wallets');
    if (localStorageWallets === null) return;
    const wallets = jsonToWallets(localStorageWallets);
    await commit('addWalletsFromStorage', wallets);
    const activeWallet = wallets[0];
    await commit('setActiveWallet', activeWallet);
    await dispatch('FETCH_WALLET_DATA', activeWallet);
  },
  ADD_WALLET({ commit, getters }, walletData) {
    const newWallet = new Wallet(walletData);

    // no wallet name duplicate @TODO add snackbar message
    if (getters.GET_WALLETS.map(({ name }) => name).indexOf(walletData.name) > -1) return;

    commit('addWallet', newWallet);
    if (!getters.GET_ACTIVE_WALLET) commit('setActiveWallet', newWallet);

    const walletsToStore = [...getters.GET_WALLETS, newWallet];
    localStorage.setItem('wallets', walletsToJSON(walletsToStore));
  },
  SET_ACTIVE_WALLET({ commit, dispatch }, newActiveWalletName) {
    if (state.activeWallet.name === newActiveWalletName) return;
    if (state.wallets.map(({ name }) => name)
      .indexOf(newActiveWalletName) === 0) return;

    const newActiveWallet = state.wallets
      .find(wallet => wallet.name === newActiveWalletName);

    commit('setActiveWallet', newActiveWallet);
    dispatch('FETCH_WALLET_DATA', newActiveWallet);
  },
  async FETCH_WALLET_DATA({ dispatch }, wallet) {
    try {
      await dispatch(
        'accountInfo/FETCH_ACCOUNT_INFO',
        wallet,
        { root: true },
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error, 'FETCH_WALLET_DATA');
    }
  },
};

/*
removeWallet(wallet) {
  let walletIndex;
  this.state.wallets.forEach((value, index) => {
    if (value.name === wallet.name) walletIndex = index;
  });

  if (walletIndex !== undefined) this.state.wallets.splice(walletIndex, 1);

  if (this.state.activeWallet && wallet.name === this.state.activeWallet.name) {
    if (this.state.wallets.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      this.state.activeWallet = this.state.wallets[0];
    } else {
      this.resetWalletData();
      this.resetErrors();
      this.state.activeWallet = false;
    }
  }
  localStorage.setItem('wallets', walletsToJSON(this.state.wallets));
}
*/

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
