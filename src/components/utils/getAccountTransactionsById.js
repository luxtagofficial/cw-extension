/* eslint-disable indent */

import {
    AccountHttp, NetworkType, PublicAccount, QueryParams,
} from 'nem2-sdk';
import {
    toArray, flatMap, map,
} from 'rxjs/operators';
import { formatTransactions } from './formatTransactions';

const getAccountTransactionsById = (
    endpoint,
    accountInfo,
    currentId,
    ) => new Promise(async (resolve, reject) => {
    try {
        const accountHttp = new AccountHttp(endpoint);
        const { publicKey } = accountInfo;
        const pageSize = 100;
        const publicAccount = PublicAccount
            .createFromPublicKey(publicKey, NetworkType.MIJIN_TEST);

        accountHttp
            .transactions(publicAccount, new QueryParams(pageSize, currentId))
            .pipe(
                flatMap(x => x),
                map(formatTransactions),
                flatMap(x => x),
                toArray(),
            )
            .subscribe((formattedTransactions) => {
                resolve(formattedTransactions);
            });
    } catch (error) {
        reject(error);
    }
});

export default getAccountTransactionsById;
