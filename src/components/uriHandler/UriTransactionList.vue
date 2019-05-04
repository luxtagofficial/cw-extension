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
          <v-toolbar-title>List of created URI invoices</v-toolbar-title>
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
                To: {{ uriTx.txRecipient }}
              </span>

              <template v-for="(asset, j) in uriTx.formattedMosaics">
                <v-list-tile-title :key="j">
                  <span class="clearfix">
                    {{ asset.mosaicName }} {{ asset.mosaicAmount }}
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
                URI: <a :href="uriTx.URI">{{ uriTx.URI }}</a>
              </span>
            </div>
          </v-list>
          <v-divider
            v-if="i + 1 < transactions"
            :key="`divider-${i}`"
          />
        </template>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    transactions: {
      type: Array,
      default() { return []; },
    },
  },
};
</script>
