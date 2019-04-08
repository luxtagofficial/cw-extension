<template>
  <v-layout column>
    <div v-if="noWallets">
      <v-layout column justify-center ma-5 text class="text-md-center">
        <v-icon x-large color="orange darken-2">warning</v-icon>
        <span>You have no wallets configured</span>
      </v-layout>
    </div>
    <div v-if="!noWallets" class="py-0">
      <v-flex xs12>
        <v-alert
          :value="true"
          type="info"
        >Please back-up your private keys if you need to re-use your wallets.</v-alert>
      </v-flex>
      <v-list two-line class="py-0">
        <v-slide-y-transition group tag="v-list" class="py-0">
          <template v-for="(wallet, index) in wallets">
            <v-list-tile :key="wallet.name" avatar ripple>
              <v-list-tile-content class="my-2">
                <v-list-tile-title>{{ wallet.name}}</v-list-tile-title>
                <v-list-tile-sub-title class="monospaced-bold">{{ wallet.account.address.pretty() }}</v-list-tile-sub-title>
                <v-list-tile-sub-title class="monospaced">{{ wallet.node }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple v-on:click="removeWallet(wallet)">
                  <v-icon color="grey lighten-1">close</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < wallets.length" :key="index"></v-divider>
          </template>
        </v-slide-y-transition>
      </v-list>
    </div>
  </v-layout>
</template>
<script>
import StateRepository from "../../infrastructure/StateRepository.js";

export default {
  data: function() {
    return {
      noWallets: StateRepository.wallets().length == 0,
      wallets: StateRepository.state.wallets
    };
  },
  watch: {
    wallets: function(val) {
      this.noWallets = StateRepository.wallets().length == 0;
    }
  },
  methods: {
    removeWallet: function(wallet) {
      StateRepository.removeWallet(wallet);
    }
  }
};
</script>
<style scoped>
</style>
