// eslint-disable-next-line import/prefer-default-export
export class Wallet {
  constructor(walletData) {
    const {
      name,
      account,
      node,
    } = walletData;

    this.name = name;
    this.account = account;
    this.node = node;
    delete this.walletData;
  }
}

export class WoWallet {
  constructor(walletData) {
    const {
      name,
      address,
      node,
      isToBeSaved,
    } = walletData;

    this.name = name;
    this.address = address;
    this.node = node;
    this.publicAccount = false;
    this.isWatchOnly = true;
    this.isToBeSaved = isToBeSaved;
    delete this.walletData;
  }
}
