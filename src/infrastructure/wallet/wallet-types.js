/* eslint-disable prefer-destructuring */
// eslint-disable-next-line import/prefer-default-export
import {
  PublicAccount, NetworkType,
} from 'nem2-sdk';

import getAccountInfo from '../accountInfo/getAccountInfo';

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
    this.isWatchOnly = false;
    this.publicAccount = false;
    this.isToBeSaved = true;
    this.publicKey = false;
    delete this.walletData;
  }
}

export class WoWallet {
  constructor(walletData) {
    const {
      name,
      address,
      publicKey,
      node,
      isToBeSaved,
      publicAccount,
    } = walletData;

    if (!address && !publicAccount && !publicKey) {
      throw new Error('address, publicAccount and publicKey can not be undefined alltogether');
    }

    this.name = name;
    this.account = false;
    this.node = node;
    this.isWatchOnly = true;

    this.publicAccount = publicAccount || { address };
    this.isToBeSaved = isToBeSaved;
    this.publicKey = publicKey || undefined;
    delete this.walletData;
  }

  async create() {
    try {
      let publicKey;
      if (this.publicAccount.publicKey) return this;
      if (this.publicKey) {
        publicKey = this.publicKey;
      } else if (!this.publicKey && this.publicAccount.address) {
        const publicAccount = await getAccountInfo(this);
        publicKey = publicAccount.publicKey;
      } else if (!this.publicKey && this.address) {
        const publicAccount = await getAccountInfo(this);
        publicKey = publicAccount.publicKey;
      } else {
        throw new Error('the parameters provided for watch only wallet creation are invalid');
      }

      this.publicAccount = PublicAccount
        .createFromPublicKey(publicKey, NetworkType.MIJIN_TEST);
    } catch (error) {
      this.accountInfo = false;
    }

    return this;
  }
}
