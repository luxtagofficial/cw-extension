import { Wallet, WoWallet } from './wallet-types';

export const walletsToJSON = wallets => JSON.stringify(wallets.map(wallet => ({
  name: wallet.name,
  isWatchOnly: wallet.isWatchOnly || false,
  address: wallet.isWatchOnly && !wallet.publicAccount.publicKey ? wallet.publicAccount.address : '',
  privateKey: wallet.isWatchOnly ? '' : wallet.account.privateKey,
  publicKey: wallet.isWatchOnly ? wallet.publicAccount.publicKey : '',
  node: wallet.node,
})));

export const jsonToWallets = async (json) => {
  try {
    const proms = JSON.parse(json).map((wallet) => {
      switch (wallet.isWatchOnly) {
      case true:
        return new WoWallet(wallet).create();

      default: return new Wallet(wallet).create();
      }
    });

    const wallets = await Promise.all(proms);

    return wallets;
  } catch (error) {
    throw new Error(error);
  }
};
