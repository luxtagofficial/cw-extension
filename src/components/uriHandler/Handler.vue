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
  <v-layout column>
    <h5 class="headline">
      URI Transaction Handler
    </h5>
    <div>
      <v-flex xs10>
        <v-card>
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
                  v-for="mosaic in transactions[0].mosaics"
                  :key="mosaic.amount.compact()"
                >
                  <li>
                    Amount: {{ mosaic.amount.compact() }}

                    Type: {{ mosaic.id.toHex() }}
                  </li>
                </ul>
              </div>

              <div class="monospaced clearfix mb-1">
                Transaction Type: {{ transactions[0].type }}
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

          <v-flex
            xs8
            class="ma-3"
          >
            <URIMetadata
              v-if="txURL"
              :uri="txURL"
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
        </v-card>
      </v-flex>
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
  </v-layout>
</template>
<script>

import { TransactionURI } from 'nem2-uri-scheme';
import Confirmation from '../Confirmation.vue';
import URIMetadata from './URIMetadata.vue';

export default {

  components: {
    Confirmation,
    URIMetadata,
  },
  data() {
    return {
      transactions: [],
      txURL: TransactionURI,
      toggleDialog: false,
      title: 'Are sure you want to accept this transaction?',
      body: 'This transaction came from a URI link, and is to be sent to an exernal service.  Please confirm all details once more before sending.',
    };
  },

  created() {
    const transactionQuery = this.$route.query.transaction;

    const parsedURI = TransactionURI.fromURI(transactionQuery);
    this.transactions.push(parsedURI.toTransaction());
    this.txURL = parsedURI;
  },

};
</script>
<style scoped>
</style>
