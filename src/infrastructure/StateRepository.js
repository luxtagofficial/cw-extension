import { Account, NetworkType } from 'nem2-sdk';
import getAccountInfo from '../components/utils/getAccountInfo';
import getMosaicsByAddress from '../components/utils/getMosaicsByAddress';
import { getNamespacesByAddress } from '../components/utils/getNamespacesByAddress';
import getAccountTransactionsById from '../components/utils/getAccountTransactionsById';
import { removeDuplicatesAndSortByBlockNumber } from '../components/utils/formatTransactions';
/* eslint-disable class-methods-use-this */

// Ports & Adapters

const walletsToJSON = wallets => JSON.stringify(wallets.map(wallet => ({
  name: wallet.name,
  privateKey: wallet.account.privateKey,
  node: wallet.node,
})));

const jsonToWallets = json => JSON.parse(json).map(wallet => ({
  name: wallet.name,
  account: Account.createFromPrivateKey(wallet.privateKey, NetworkType.MIJIN_TEST),
  node: wallet.node,
}));

class StateRepository {
  constructor() {
    const wallets = localStorage.getItem('wallets');
    this.state = {
      wallets: wallets != null ? jsonToWallets(wallets) : [],
      accountInfo: false,
      assets: false,
      transactions: false,
      namespaces: false,
      error: false,
      errorMessage: '',
      activeWallet: false,
      loading_getAccountInfo: false,
      loading_getMosaicsByAddress: false,
      loading_getAccountTransactionsById: false,
      loading_getNamespacesByAddress: false,
    };
    this.state.activeWallet = this.state.wallets.length === 0 ? false : this.state.wallets[0];
  }

  wallets() {
    return this.state.wallets;
  }

  storeWallet(walletName, account, node) {
    this.state.wallets.push({ name: walletName, account, node });
    localStorage.setItem('wallets', walletsToJSON(this.state.wallets));
    if (!this.state.activeWallet) {
      const newWallet = this.state.wallets[0];
      this.state.activeWallet = newWallet;
    }
  }

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

  async onWalletChange(walletName) {
    try {
      this.resetWalletData();
      this.state.loading_getAccountInfo = true;
      this.resetErrors();
      const activeWallet = await this.currentWallet(walletName);
      this.state.accountInfo = await getAccountInfo(activeWallet);
      this.state.loading_getAccountInfo = false;
      this.loadMosaics();
      this.loadNamespaces();
      this.getAccountTransactionsById('init');
    } catch (error) {
      this.state.error = true;
      this.state.errorMessage = error.toString() === 'Error: ResourceNotFound'
        ? 'This wallet is not known by the network'
        : 'An error occured while getting the wallet account information';
      // eslint-disable-next-line no-console
      console.error(error);
      this.state.loading_getAccountInfo = false;
    }
  }

  currentWallet(walletName) {
    return new Promise((resolve, reject) => {
      const activeWallet = this.state.wallets.find(x => x.name === walletName);
      if (activeWallet) {
        this.state.activeWallet = activeWallet;
        resolve(activeWallet);
      } else {
        reject(new Error('This wallet is undefined'));
      }
    });
  }

  async loadMosaics() {
    try {
      this.state.assets = false;
      this.state.loading_getMosaicsByAddress = true;
      this.state.assets = await getMosaicsByAddress(this.state.activeWallet);
      this.state.loading_getMosaicsByAddress = false;
    } catch (error) {
      this.error = true;
      this.errorMessage = 'Error while loading mosaics';
      this.state.loading_getMosaicsByAddress = false;
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  async loadNamespaces() {
    try {
      this.state.namespaces = false;
      this.state.loading_getNamespacesByAddress = true;
      this.state.namespaces = await getNamespacesByAddress(this.state.activeWallet);
      this.state.loading_getNamespacesByAddress = false;
    } catch (error) {
      this.error = true;
      this.errorMessage = 'Error while loading mosaics';
      this.state.loading_getNamespacesByAddress = false;
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  async getAccountTransactionsById(mode) {
    let currentId;
    try {
      if (this.state.accountInfo) {
        switch (mode) {
          case 'more':
            currentId = this.state.transactions.length > 0
              ? this.state.transactions[this.state.transactions.length - 1].id
              : undefined;
            break;
          case 'init':
          case 'refresh':
          default:
            currentId = undefined;
            break;
        }
      }

      if (mode === 'init') this.state.transactions = false;
      this.state.loading_getAccountTransactionsById = true;
      const newTransactions = await getAccountTransactionsById(
        this.state.activeWallet.node,
        this.state.accountInfo,
        currentId,
      );

      const oldTransactions = this.state.transactions !== false ? this.state.transactions : [];
      this.state.transactions = removeDuplicatesAndSortByBlockNumber([
        ...oldTransactions,
        ...newTransactions,
      ]);
      this.state.loading_getAccountTransactionsById = false;
    } catch (error) {
      this.error = true;
      this.errorMessage = 'Error while loading transactions';
      this.loading_getAccountTransactionsById = false;
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  resetErrors() {
    this.state.error = false;
    this.state.errorMessage = '';
  }

  resetWalletData() {
    this.state.accountInfo = false;
    this.state.assets = false;
    this.state.transactions = false;
    this.state.namespaces = false;
  }
}

const stateRepository = new StateRepository();

export default stateRepository;
