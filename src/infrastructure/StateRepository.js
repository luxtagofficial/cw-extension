import { Account, NetworkType } from 'nem2-sdk';
import getAccountInfo from '../components/utils/getAccountInfo';
import getMosaicsByAddress from '../components/utils/getMosaicsByAddress';

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
      accountInfo: {},
      assets: false,
      error: false,
      errorMessage: '',
      activeWallet: false,
      loading_getAccountInfo: false,
      loading_getMosaicsByAddress: false,
    };
    this.state.activeWallet = this.state.wallets.length === 0 ? false : this.state.wallets[0];
  }

  wallets() {
    return this.state.wallets;
  }

  storeWallet(walletName, account, node) {
    this.state.wallets.push({ name: walletName, account, node });
    localStorage.setItem('wallets', walletsToJSON(this.state.wallets));
  }

  removeWallet(wallet) {
    let walletIndex;
    this.state.wallets.forEach((value, index) => {
      if (value.name === wallet.name) walletIndex = index;
    });
    if (this.state.activeWallet && wallet.name === this.state.activeWallet.name) {
      this.resetWalletData();
      this.resetErrors();
      this.state.activeWallet = false;
    }
    if (walletIndex !== undefined) this.state.wallets.splice(walletIndex, 1);
    localStorage.setItem('wallets', walletsToJSON(this.state.wallets));
  }

  async onWalletChange(walletName) {
    try {
      this.resetWalletData();
      this.state.loading_getAccountInfo = true;
      this.resetErrors();
      const activeWallet = await this.currentWallet(walletName);
      const accountInfo = await getAccountInfo(activeWallet);
      this.state.accountInfo = accountInfo;
      this.state.loading_getAccountInfo = false;
      this.loadMosaics();
    } catch (error) {
      this.state.error = true;
      this.state.errorMessage = error === 'This wallet is not known by the network'
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
      if (typeof activeWallet !== 'undefined') {
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
      const assets = await getMosaicsByAddress(this.state.activeWallet);
      this.state.assets = assets;
      this.state.loading_getMosaicsByAddress = false;
    } catch (error) {
      this.error = true;
      this.errorMessage = 'Error while loading mosaics';
      this.loading_getMosaicsByAddress = false;
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  resetErrors() {
    this.state.error = false;
    this.state.errorMessage = '';
  }

  resetWalletData() {
    this.state.accountInfo = {};
    this.state.assets = false;
  }
}

const stateRepository = new StateRepository();

export default stateRepository;
