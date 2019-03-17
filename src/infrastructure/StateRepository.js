import { Account, NetworkType } from "nem2-sdk";

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
    };
    this.state.activeWallet = this.state.wallets.length === 0 ? null : this.state.wallets[0];
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
    if (walletIndex !== undefined) this.state.wallets.splice(walletIndex, 1);
    localStorage.setItem('wallets', walletsToJSON(this.state.wallets));
  }

  currentWallet(walletName) {
    this.state.wallets.forEach((value) => {
      if (value.name === walletName) this.state.activeWallet = value;
    });
  }
}

const stateRepository = new StateRepository();

export default stateRepository;
