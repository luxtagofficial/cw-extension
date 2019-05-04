// Copyright (C) 2019 Contributors as noted in the AUTHORS file
//
// This file is part of nem2-wallet-browserextension.
//
// nem2-wallet-browserextension is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// nem2-wallet-browserextension is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with nem2-wallet-browserextension.  If not, see http://www.gnu.org/licenses/.

<template>
  <v-layout
    row
    pb-2
    mt-4
  >
    <v-container
      fluid
      pa-0
      ma-0
    >
      <v-flex
        v-if="transactions"
        xs12
      >
        <v-alert
          xs12
          class="ma-0 pb-4"
          :value="true"
          type="error"
        >
          CAUTION:  You are about to sign a transaction for an external service.&nbsp;
          Exercise extreme caution and verify all details before proceeding.
        </v-alert>
      </v-flex>
      <v-flex xs12>
        <UriTransactionList
          v-if="formattedTransactions"
          :transactions="formattedTransactions"
          list-type="uriToValidate"
        />
        <CreateTransferInvoice />
      </v-flex>
    </v-container>
  </v-layout>
</template>
<script>

import { Address } from 'nem2-sdk';
import { TransactionURI } from 'nem2-uri-scheme';
import { txTypeNameFromTypeId } from '../../infrastructure/transactions/transactions-types';
import { networkCurrencyIdToName } from '../../infrastructure/network/utils/nerworkCurrencyToName';
import CreateTransferInvoice from './CreateTransferInvoice.vue';
import UriTransactionList from './UriTransactionList.vue';

export default {
  components: {
    CreateTransferInvoice,
    UriTransactionList,
  },
  data() {
    return {
      transactions: false,
      formattedTransactions: false,
      txURL: false,
      txURI: false,
      toggleDialog: false,
      title: 'Are sure you want to accept this transaction?',
      body: 'This transaction came from a URI link, and is to be sent to an exernal service.  Please confirm all details once more before sending.',
    };
  },
  created() {
    try {
      const transactionQuery = this.$route.query.transaction;
      const transactionURI = TransactionURI.fromURI(transactionQuery);
      const transaction = transactionURI.toTransaction();
      const formattedMosaics = transaction.mosaics
        .map(mosaic => ({
          ...mosaic,
          mosaicName: networkCurrencyIdToName(mosaic.id.toHex()),
          mosaicAmount: mosaic.amount.compact(),
        }));

      const formattedTransaction = {
        transaction,
        txType: txTypeNameFromTypeId(transaction.type),
        formattedMosaics,
        chainId: transactionURI.chainId,
        endpoint: transactionURI.endpoint,
        URI: transactionQuery,
        txRecipient: new Address(transaction.recipient.address).pretty(),
      };

      if (!this.transactions) this.transactions = [];
      if (!this.formattedTransaction) this.formattedTransaction = [];

      if (!this.formattedTransactions) this.formattedTransactions = [];
      this.formattedTransactions.push(formattedTransaction);

      this.transactions.push(transaction);
      this.txURI = transactionURI;
      this.txURL = transactionQuery;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Handler.vue - created', error);
    }
  },
};
</script>
