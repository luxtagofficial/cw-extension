/* eslint-disable indent */

import {
    AccountHttp, NetworkType, PublicAccount, QueryParams,
} from 'nem2-sdk';
import {
    toArray, flatMap, map,
} from 'rxjs/operators';
import { formatTransaction } from './formatTransaction';

const getAccountTransactionsById = (
    endpoint,
    accountInfo,
    currentId,
    ) => new Promise(async (resolve, reject) => {
    try {
        const accountHttp = new AccountHttp(endpoint);
        const { publicKey } = accountInfo;
        const pageSize = 25;
        const publicAccount = PublicAccount
            .createFromPublicKey(publicKey, NetworkType.MIJIN_TEST);

        accountHttp
            .transactions(publicAccount, new QueryParams(pageSize, currentId))
            .pipe(
                flatMap(x => x),
                map(formatTransaction),
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
