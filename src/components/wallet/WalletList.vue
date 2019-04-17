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
    <div v-if="noWallets">
      <v-alert
        :value="true"
        type="error"
      >
        You have no wallets configured, please create a wallet
      </v-alert>
    </div>
    <div
      v-if="!noWallets"
      class="py-0"
    >
      <v-flex xs12>
        <v-alert
          :value="true"
          type="info"
        >
          Please back-up your private keys if you need to re-use your wallets.
        </v-alert>
      </v-flex>
      <v-list
        two-line
        class="py-0"
      >
        <v-slide-y-transition
          group
          tag="v-list"
          class="py-0"
        >
          <template v-for="(wallet, index) in wallets">
            <v-list-tile
              :key="wallet.name"
              avatar
              ripple
            >
              <v-list-tile-content class="my-2">
                <v-list-tile-title>{{ wallet.name }}</v-list-tile-title>
                <v-list-tile-sub-title class="monospaced-bold">
                  {{ wallet.account.address.pretty() }}
                </v-list-tile-sub-title>
                <v-list-tile-sub-title class="monospaced">
                  {{ wallet.node }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn
                  icon
                  ripple
                  @click="removeWallet(wallet)"
                >
                  <v-icon color="grey lighten-1">
                    close
                  </v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider
              v-if="index + 1 < wallets.length"
              :key="index"
            />
          </template>
        </v-slide-y-transition>
      </v-list>
    </div>
  </v-layout>
</template>
<script>
import StateRepository from '../../infrastructure/StateRepository';

export default {
  data() {
    return {
      noWallets: StateRepository.wallets().length === 0,
      wallets: StateRepository.state.wallets,
    };
  },
  watch: {
    wallets() {
      this.noWallets = StateRepository.wallets().length === 0;
    },
  },
  methods: {
    removeWallet(wallet) {
      StateRepository.removeWallet(wallet);
    },
  },
};
</script>
<style scoped>
</style>
