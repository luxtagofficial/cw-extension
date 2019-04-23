import { Account, NetworkType } from 'nem2-sdk';


export const walletsToJSON = wallets => JSON.stringify(wallets.map(wallet => ({
  name: wallet.name,
  privateKey: wallet.account.privateKey,
  node: wallet.node,
})));

export const jsonToWallets = json => JSON.parse(json).map(wallet => ({
  name: wallet.name,
  account: Account.createFromPrivateKey(wallet.privateKey, NetworkType.MIJIN_TEST),
  node: wallet.node,
}));
