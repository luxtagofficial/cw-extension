import { Account, NetworkType, PublicAccount } from 'nem2-sdk';


export const walletsToJSON = wallets => JSON.stringify(wallets.map(wallet => ({
  name: wallet.name,
  isWatchOnly: wallet.isWatchOnly || false,
  privateKey: wallet.isWatchOnly ? '' : wallet.account.privateKey,
  publicKey: wallet.isWatchOnly ? wallet.publicAccount.publicKey : '',
  node: wallet.node,
})));

export const jsonToWallets = json => JSON.parse(json).map(wallet => ({
  name: wallet.name,
  isWatchOnly: wallet.isWatchOnly || false,
  account: wallet.isWatchOnly
    ? ''
    : Account.createFromPrivateKey(wallet.privateKey, NetworkType.MIJIN_TEST),
  publicAccount: wallet.isWatchOnly
    ? PublicAccount.createFromPublicKey(wallet.publicKey, NetworkType.MIJIN_TEST)
    : '',
  node: wallet.node,
}));
