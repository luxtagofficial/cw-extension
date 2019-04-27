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
    pb-2
    mt-3
  >
    <v-container fluid>
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
        >
          <Errors style="margin-bottom:35px !important" />
          <v-card
            v-if="
              wallet.wallets.length > 0 &&
                wallet.activeWallet
            "
          >
            <v-toolbar
              card
              prominent
            >
              <v-toolbar-title>Account information</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <div class="monospaced account-info-container">
                <h5 class="headline mb-0 mb-1">
                  {{ wallet.activeWallet.name }}
                </h5>
                <div class="clearfix homeLine">
                  <div v-if="wallet.activeWallet.isWatchOnly">
                    Watch-Only Wallet
                  </div>
                  <div class="clearfix">
                    Address:
                  </div>
                  <div
                    v-if="wallet.activeWallet.isWatchOnly && wallet.activeWallet.publicAccount"
                    class="clearfix"
                  >
                    {{ wallet.activeWallet.publicAccount.address.pretty() }}
                  </div>
                  <div
                    v-if="!wallet.activeWallet.isWatchOnly"
                    class="clearfix"
                  >
                    {{ wallet.activeWallet.account.address.pretty() }}
                  </div>
                </div>
                <div class="clearfix homeLine">
                  <span
                    v-show="accountInfo.accountInfo"
                    class="clearfix"
                  >Public key:</span>
                  <span
                    v-show="accountInfo.accountInfo"
                    class="clearfix"
                  >
                    {{ accountInfo.accountInfo.publicKey }}
                  </span>
                </div>
                <div class="clearfix homeLine">
                  <span class="clearfix">Current node:</span>
                  <a
                    class="clearfix"
                    :href="wallet.activeWallet.node"
                    target="_new"
                  >
                    {{ wallet.activeWallet.node }}</a>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout
        row
        wrap
        style="margin-top: 30px !important;"
      >
        <v-flex
          xs12
        >
          <Transactions
            v-if="wallet.wallets.length > 0 &&
              wallet.activeWallet &&
              !application.error &&
              accountInfo.accountInfo"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>
<script>
import { mapState } from 'vuex';
import Errors from './Errors.vue';
import Transactions from './transactions/Transactions.vue';

export default {
  name: 'Home',
  components: {
    Errors,
    Transactions,
  },
  computed: mapState([
    'wallet',
    'accountInfo',
    'application',
    'transactions',
  ]),
};
</script>

<style scoped>
.account-info-container {
  height: auto;
  overflow: hidden;
}
</style>
