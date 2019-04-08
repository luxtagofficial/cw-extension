import { AccountHttp, Address } from 'nem2-sdk';

const getAccountInfo = (wallet) => {
  return new Promise((resolve, reject) => {
    const accountHttp = new AccountHttp(wallet.node);
    accountHttp.getAccountInfo(wallet.account.address).subscribe(
      (ai) => {
        resolve({
          address: ai.address.address,
          addressPretty: new Address(ai.address.address).pretty(),
          publicKey: ai.publicKey,
        });
      },
      (err) => {
        // @TODO: rationalize
        if (
          err.response
          && JSON.parse(err.response.text).code === 4
        ) {
          reject(new Error('This wallet is not known by the network'));
        } else {
          reject(new Error('error at getAccountInfo', JSON.stringify(err)));
        }
      },
    );
  });
};

export default getAccountInfo;
