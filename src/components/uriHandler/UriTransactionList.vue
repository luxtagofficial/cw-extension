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
  <v-layout row>
    <v-flex
      v-if="transactions
        && transactions.length > 0"
      xs12
    >
      <v-card>
        <v-toolbar
          card
          prominent
        >
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <template
          v-for="(uriTx, i) in transactions"
        >
          <v-list
            :key="i"
            class="pa-3"
            style="overflow: auto; height: auto !important;"
            height="auto"
            three-line
          >
            <div class="clearfix">
              <span class="clearfix">
                Type: {{ uriTx.txType }}
              </span>

              <span class="clearfix">
                To: {{ uriTx.txRecipient }}
              </span>

              <template v-for="(asset, j) in uriTx.formattedMosaics">
                <v-list-tile-title :key="j">
                  <span class="clearfix">
                    {{ asset.mosaicName }} {{ asset.mosaicAmount.toLocaleString() }}
                  </span>
                </v-list-tile-title>
              </template>

              <span
                v-if="uriTx.transaction.message.payload !== ''"
                class="clearfix"
              >
                Message: {{ uriTx.transaction.message.payload }}
              </span>

              <span class="clearfix">
                Chain ID: {{ uriTx.chainId }}
              </span>

              <span class="clearfix">
                Endpoint: <a :href="uriTx.endpoint">{{ uriTx.endpoint }}</a>
              </span>

              <span class="clearfix">
                URI: <a :href="uriTx.URI">{{ uriTx.URI }}</a>
              </span>
            </div>
          </v-list>
          <v-card-actions
            v-if="listType === 'uriToValidate'"
            :key="`actions-${i}`"
            class="pa-3"
          >
            <v-spacer />
            <v-btn
              flat
              @click="toggleDialog = true"
            >
              Accept transaction
            </v-btn>
          </v-card-actions>
          <v-divider
            v-if="i + 1 < transactions"
            :key="`divider-${i}`"
          />
        </template>
      </v-card>
    </v-flex>
    <Confirmation
      v-model="toggleDialog"
      :v-if="listType === 'uriToValidate'"
      :transactions="transactions.map(({transaction})=>transaction)"
      :title="confirmationTitle"
      :body="body"
      :max-width="600"
    >
      <v-list
        v-for="(uriTx) in transactions"
        :key="uriTx.transaction.recipient.plain()"
      >
        <v-list-tile>
          <v-list-tile-title>
            Recipient: {{ uriTx.transaction.recipient.plain() }}
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </Confirmation>
  </v-layout>
</template>

<script>

import Confirmation from '../Confirmation.vue';

export default {
  components: {
    Confirmation,
  },
  props: {
    transactions: {
      type: Array,
      default() { return []; },
    },
    listType: {
      type: String,
      default() { return ''; },
    },
  },
  data() {
    return {
      toggleDialog: false,
      confirmationTitle: 'Are sure you want to accept this transaction?',
      body: 'This transaction came from a URI link, and is to be sent to an exernal service.  Please confirm all details once more before sending.',
    };
  },
  computed: {
    title() {
      return this.type === 'uriToValidate'
        ? 'URI transactions to validate'
        : 'List of created URI invoices';
    },
  },
};
</script>
