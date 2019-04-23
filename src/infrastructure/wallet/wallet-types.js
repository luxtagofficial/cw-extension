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
