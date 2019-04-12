import { AccountHttp } from 'nem2-sdk';
import { formatAccountInfo } from './formatAccountInfo';

const getAccountInfo = (wallet) => {
  return new Promise((resolve, reject) => {
    const accountHttp = new AccountHttp(wallet.node);
    accountHttp.getAccountInfo(wallet.account.address).subscribe(
      (ai) => {
        resolve(formatAccountInfo(ai));
      },
      (err) => {
        // @TODO: rationalize
        if (
          err.response
          && JSON.parse(err.response.text).code === 'ResourceNotFound'
        ) {
          reject(new Error('ResourceNotFound'));
        } else {
          reject(new Error('error at getAccountInfo', JSON.stringify(err)));
        }
      },
    );
  });
};

export default getAccountInfo;
