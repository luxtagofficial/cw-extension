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
import { PublicAccount, NetworkType } from 'nem2-sdk';
import { walletsToJSON, jsonToWallets } from '../infrastructure/wallet/wallet';
import { Wallet, WoWallet } from '../infrastructure/wallet/wallet-types';
import { GET_TRANSACTIONS_MODES } from '../infrastructure/transactions/transactions-types';
import { GET_NAMESPACES_MODES } from '../infrastructure/namespaces/namespaces-types';
import { GET_ASSETS_MODES } from '../infrastructure/assets/assets-types';

const state = {
  activeWallet: false,
  wallets: [],
  // @TODO: walletNumber is a quickfix, to be replaced in the future
  walletNumber: 0,
};

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
    state.walletNumber += 1;
  },
  addWalletsFromStorage(state, wallets) {
    state.wallets = wallets;
    state.walletNumber += wallets.length;
  },
  removeWallet(state, indexOfWalletToRemove) {
    state.wallets.splice(indexOfWalletToRemove, 1);
  },
  setActiveWalletPublicAccount(state, publicAccount) {
    state.activeWallet.publicAccount = publicAccount;
  },
  setWalletPublicAccount(state, { walletIndex, publicAccount }) {
    state.wallets[walletIndex].publicAccount = publicAccount;
  },
};

const actions = {
  async INIT_APPLICATION({ dispatch, commit }) {
    // @TODO:Move application initialization to a more suitable place (application store?)

    const localStorageWallets = localStorage.getItem('wallets');
    if (!localStorageWallets) return;

    const wallets = jsonToWallets(localStorageWallets);
    if (!(wallets.length > 0)) return;
    await commit('addWalletsFromStorage', wallets);
    const activeWallet = wallets[0];
    await commit('setActiveWallet', activeWallet);

    await dispatch('FETCH_WALLET_DATA', activeWallet);
  },

  async ADD_WALLET({ commit, getters, dispatch }, walletData) {
    const newWallet = new Wallet(walletData);

    // no wallet name duplicate @TODO add snackbar message
    if (getters.GET_WALLETS.map(({ name }) => name).indexOf(walletData.name) > -1) return;

    await commit('addWallet', newWallet);

    if (!getters.GET_ACTIVE_WALLET) {
      dispatch('SET_ACTIVE_WALLET', newWallet.name);
    }

    const walletsToStore = [
      ...getters.GET_WALLETS.filter(({ isToBeSaved }) => isToBeSaved === true),
    ];
    localStorage.setItem('wallets', walletsToJSON(walletsToStore));
  },
  async ADD_WATCH_ONLY_WALLET({ getters, commit, dispatch }, walletData) {
    const newWoWallet = new WoWallet(walletData);
    await commit('addWallet', newWoWallet);

    if (newWoWallet.isToBeSaved) {
      const walletsToStore = [
        ...getters.GET_WALLETS.filter(({ isToBeSaved }) => isToBeSaved === true),
      ];
      localStorage.setItem('wallets', walletsToJSON(walletsToStore));
    }

    dispatch('SET_ACTIVE_WALLET', newWoWallet.name);
  },
  async SET_ACTIVE_WALLET({ commit, dispatch, getters }, newActiveWalletName) {
    if (getters.GET_ACTIVE_WALLET.name === newActiveWalletName) return;
    const wallets = await getters.GET_WALLETS;
    console.log(wallets, 'WALLETS')
    if (wallets.map(({ name }) => name).indexOf(newActiveWalletName) === -1) return;

    const newActiveWallet = wallets.find(wallet => wallet.name === newActiveWalletName);
    console.log(newActiveWallet, 'newActiveWallet')

    await commit('setActiveWallet', newActiveWallet);
    dispatch('FETCH_WALLET_DATA', newActiveWallet);
  },

  async REMOVE_WALLET({ commit, getters, dispatch }, walletName) {
    const indexOfWalletToRemove = getters.GET_WALLETS.findIndex(({ name }) => name === walletName);

    await commit('removeWallet', indexOfWalletToRemove);

    const wallets = getters.GET_WALLETS;

    dispatch('application/RESET_ERRORS', null, { root: true });

    // @TODO:Refactor clear account info and move to a more suitable place
    dispatch('accountInfo/CLEAR_ACCOUNT_INFO', null, { root: true });
    dispatch('transactions/CLEAR_TRANSACTIONS', null, { root: true });
    dispatch('assets/CLEAR_ASSETS', null, { root: true });
    dispatch('namespaces/CLEAR_NAMESPACES', null, { root: true });

    if (wallets.length === 0) {
      commit('setActiveWallet', false);
    } else if (getters.GET_ACTIVE_WALLET.name === walletName) {
      commit('setActiveWallet', getters.GET_WALLETS[0]);
    }

    const walletsToStore = [
      ...getters.GET_WALLETS.filter(({ isToBeSaved }) => isToBeSaved === true),
    ];
    localStorage.setItem('wallets', walletsToJSON(walletsToStore));
  },

  async FETCH_WALLET_DATA({ dispatch, getters, commit, rootGetters }, wallet) {
    if (wallet === false) return;
    try {
      await dispatch('accountInfo/FETCH_ACCOUNT_INFO', wallet, { root: true });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error, 'FETCH_WALLET_DATA');
      return;
    }
    
    if (wallet.isWatchOnly && !wallet.publicAccount) {
      const accountInfo = await getters['accountInfo/GET_ACCOUNT_INFO'].publicKey;
      const publicAccount = PublicAccount.createFromPublicKey(
        accountInfo.publicKey,
        NetworkType.MIJIN_TEST,
      );
      await commit('setActiveWalletPublicAccount', publicAccount);

      if (wallet.isToBeSaved) {
        const walletIndex = getters.GET_WALLETS.findIndex(({ name }) => name === wallet.name);
        commit('setWalletPublicAccount', { walletIndex, publicAccount });
      }
    }
    
    dispatch(
      'transactions/GET_TRANSACTIONS_BY_ID',
      { wallet, mode: GET_TRANSACTIONS_MODES.INIT }, { root: true },
    );
    dispatch(
      'namespaces/GET_NAMESPACES_BY_ADDRESS',
      { wallet, mode: GET_NAMESPACES_MODES.ON_WALLET_CHANGE }, { root: true },
    );
    dispatch(
      'assets/GET_ASSETS_BY_ADDRESS',
      { wallet, mode: GET_ASSETS_MODES.ON_WALLET_CHANGE }, { root: true },
    );
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
