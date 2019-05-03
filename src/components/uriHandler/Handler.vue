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
      <v-layout column>
        <div v-if="transactions">
          <div>
            <v-flex xs10>
              <v-alert
                xs6
                class="ma-0"
                :value="true"
                type="error"
              >
                CAUTION:  You are about to sign a transaction for an external service.&nbsp;
                Exercise extreme caution and verify all details before proceeding.
              </v-alert>
              <v-card-title>
                <div>
                  <div class="monospaced-bold clearfix mb-2">
                    Recipient: {{ transactions[0].recipient.pretty() }}
                  </div>

                  <div class="monospaced clearfix mb-1">
                    <ul
                      v-for="mosaic in formattedTransaction[0].formattedMosaics"
                      :key="mosaic.amount.compact()"
                    >
                      <li>
                        Amount: {{ mosaic.amount.compact() }}

                        Asset: {{ mosaic.mosaicName }}
                      </li>
                    </ul>
                  </div>

                  <div class="monospaced clearfix mb-1">
                    Transaction Type: {{ transactions[0].txType }}
                  </div>

                  <div class="monospaced clearfix mb-1">
                    Message: {{ transactions[0].message.payload }}
                  </div>


                  <div class="monospaced clearfix mb-1">
                    Chain Destination: {{ txURL.chainId }}
                  </div>

                  <div class="monospaced clearfix mb-1">
                    Endpoint: {{ txURL.endpoint }}
                  </div>
                </div>
              </v-card-title>
            </v-flex>

            <v-flex
              xs8
              class="ma-3"
            >
              <URIMetadata
                v-if="txURL"
                :uri="txURI"
                :url="txURL"
              />
            </v-flex>

            <v-card-actions>
              <v-btn
                color="primary mx-0"
                @click="toggleDialog = true"
              >
                Accept transaction
              </v-btn>
            </v-card-actions>
          </div>
          <Confirmation
            v-model="toggleDialog"
            :transactions="transactions"
            :title="title"
            :body="body"
            :max-width="600"
          >
            <v-list
              v-for="(tx) in transactions"
              :key="tx.recipient.plain()"
            >
              <v-list-tile>
                <v-list-tile-title>
                  Recipient: {{ tx.recipient.plain() }}
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </Confirmation>
        </div>
      </v-layout>
      <v-layout>
        <CreateTransferInvoice />
      </v-layout>
    </v-container>
  </v-layout>
</template>
<script>

import { TransactionURI } from 'nem2-uri-scheme';
import { txTypeNameFromTypeId } from '../../infrastructure/transactions/transactions-types';
import { networkCurrencyIdToName } from '../../infrastructure/network/utils/nerworkCurrencyToName';
import Confirmation from '../Confirmation.vue';
import URIMetadata from './URIMetadata.vue';
import CreateTransferInvoice from './CreateTransferInvoice.vue';

export default {
  components: {
    Confirmation,
    URIMetadata,
    CreateTransferInvoice,
  },
  data() {
    return {
      transactions: false,
      formattedTransaction: false,
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
        }));

      const formattedTransaction = {
        ...transaction,
        txType: txTypeNameFromTypeId(transaction.type),
        formattedMosaics,
      };

      if (!this.transactions) this.transactions = [];
      if (!this.formattedTransaction) this.formattedTransaction = [];

      this.formattedTransaction.push(formattedTransaction);

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
<style scoped>
</style>


// web+nem://transaction?data=AA0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000390544100000000000000000000000000000000900D81120CEC95A998B41773D3653104D530CA908318755BA10600010068656C6C6F44B262C46CEABB858096980000000000&chainId=test&endpoint=http://13.114.200.132:3000
