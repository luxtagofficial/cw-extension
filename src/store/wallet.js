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
};

const actions = {
  ADD_WALLET({ commit, getters }, walletData) {
    const newWallet = new Wallet(walletData);
    const walletsToStore = [...getters.GET_WALLETS, newWallet];
    if (!getters.GET_ACTIVE_WALLET) commit('setActiveWallet', newWallet);
    commit('addWallet', newWallet);
    localStorage.setItem('wallets', walletsToJSON(walletsToStore));
  },
  SET_ACTIVE_WALLET(context, newActiveWalletName) {
    if (state.activeWallet.name === newActiveWalletName) return;
    if (state.wallets.map(({ name }) => name)
      .indexOf(newActiveWalletName) === 0) return;

    const newActiveWallet = state.wallets
      .find(wallet => wallet.name === newActiveWalletName);

    context.commit('setActiveWallet', newActiveWallet);

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
