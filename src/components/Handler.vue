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
// along with nem2-wallet-browserextension.  If not, see <http://www.gnu.org/licenses/>.

<template>
  <v-layout column>
    <h5 class="headline">Transaction Handler</h5>
      <v-flex xs12>
        <v-card>
          
          <v-card-title>
            <div>
              <div class="monospaced-bold clearfix mb-2">
                Recipient: {{ transactions[0].recipient.pretty() }}
              </div>
              
              <div class="monospaced clearfix mb-1">
                <ul v-for="mosaic in transactions[0].mosaics" :key="mosaic.amount.compact()">
                  <li> 
                    {{ mosaic.amount.compact() }}
                  </li>
                </ul>
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

          <v-card-actions>

            <v-btn
          color="primary mx-0"
          @click="toggleDialog = true"
          >Accept transaction</v-btn>

          </v-card-actions>
        </v-card>
      </v-flex>
   <v-flex xs12>
      <v-alert :value="true" type="info">
        Please confirm the details of the transaction before proceeding.
      </v-alert>
    </v-flex>
    <Confirmation :value="toggleDialog" :transactions="transactions" :title="title" :body="body" :maxWidth="500"  />
  </v-layout>
</template>
<script>

import { TransactionURI, URIFormat } from 'nem2-uri-scheme';
import { TransferTransaction, Deadline, Address, NetworkCurrencyMosaic, NetworkType, PlainMessage, TransactionType } from 'nem2-sdk';
import Confirmation from './Confirmation.vue';

export default {
  data: function () {
    return { 
      transactions: [],
      txURL: Object,
      toggleDialog: false,
      title: "Are sure you want to accept this transaction?",
      body: "This transaction came from a URI link, and is to be sent to address as specified by the URI"

    }
  },

  components: {
    Confirmation
  },

  created: function () {
    const transactionQuery = this.$route.query.transaction;

    const txDetail = 
    (transactionQuery.substring('web+nem://transaction?data='.length, transactionQuery.length))
    .split('?')
    .map((detail) => detail.substring(detail.indexOf('=')+1, detail.length));

   const transactionURI = new TransactionURI(URIFormat.serialized, txDetail[1], txDetail[2], txDetail[3]);

   const uriTX = transactionURI.toTransaction();
   this.transactions.push(uriTX);
   this.txURL = transactionURI;
  },
};
</script>
<style scoped>
</style>
