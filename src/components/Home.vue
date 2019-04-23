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
  <v-layout
    column
    xs12
  >
    <v-layout
      row
      mb-4
    >
      <v-layout
        row
        fill-height
        justify-start
        pl-3
        xs12
      >
        <h5 class="headline pt-3">
          Information
        </h5>
      </v-layout>
    </v-layout>
    <div
      v-if="
        sharedState.wallets.length > 0 &&
          sharedState.activeWallet
      "
    >
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div class="monospaced">
              <h5 class="headline mb-0 mb-1">
                {{ sharedState.activeWallet.name }}
              </h5>
              <div class="clearfix homeLine">
                <div class="clearfix">
                  Address:
                </div>
                <div class="clearfix">
                  {{ sharedState.activeWallet.account.address.pretty() }}
                </div>
              </div>
              <div class="clearfix homeLine">
                <span
                  v-show="sharedState.accountInfo"
                  class="clearfix"
                >Public key:</span>
                <span
                  v-show="sharedState.accountInfo"
                  class="clearfix"
                >{{
                  sharedState.accountInfo.publicKey
                }}</span>
              </div>
              <div class="clearfix homeLine">
                <span class="clearfix">Current node:</span>
                <a
                  class="clearfix"
                  :href="sharedState.activeWallet.node"
                  target="_new"
                >
                  {{ sharedState.activeWallet.node }}</a>
              </div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </div>
    <Errors :shared-state="sharedState" />
    <div
      v-if="
        sharedState.wallets.length > 0 &&
          sharedState.activeWallet &&
          !sharedState.error &&
          sharedState.accountInfo
      "
    >
      <div v-if="sharedState.loading_getAccountTransactionsById">
        <v-progress-linear :indeterminate="true" />
      </div>
      <div
        v-if="sharedState.transactions && sharedState.transactions.length > 0"
      >
        <Transactions :transactions="sharedState.transactions" />
      </div>
    </div>
  </v-layout>
</template>
<script>
import StateRepository from '../infrastructure/StateRepository';
import Errors from './Errors.vue';
import Transactions from './transactions/Transactions.vue';

export default {
  components: {
    Errors,
    Transactions,
  },
  data() {
    return { sharedState: StateRepository.state };
  },
  created() {
    if (StateRepository.state.activeWallet && !StateRepository.state.accountInfo) {
      StateRepository.onWalletChange(StateRepository.state.activeWallet.name);
    }
  },
};
</script>
<style scoped>
</style>
