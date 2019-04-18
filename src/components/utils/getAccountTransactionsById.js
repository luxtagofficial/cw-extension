/**
 * Copyright (C) 2019 Contributors as noted in the AUTHORS file
 *
 * This file is part of nem2-wallet-browserextension.
 *
 * nem2-wallet-browserextension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * nem2-wallet-browserextension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with nem2-wallet-browserextension.  If not, see <http://www.gnu.org/licenses/>.
 */

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
