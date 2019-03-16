<template>
  <v-layout column>
    <div v-show="noWallets">
      <v-layout column justify-center ma-5 text class="text-md-center">
        <v-icon x-large color="orange darken-2">warning</v-icon>
        <span>You have no wallets configured</span>
      </v-layout>
    </div>
    <div v-show="!noWallets" class="py-0">
      <v-list two-line class="py-0">
        <v-slide-y-transition group tag="v-list" class="py-0">
          <template v-for="(wallet, index) in wallets">
            <v-list-tile :key="wallet.name" avatar ripple @click="toggle(index)">
              <v-list-tile-content class="my-2">
                <v-list-tile-title>{{ wallet.name}}</v-list-tile-title>
                <v-list-tile-sub-title class="monospaced-bold">{{ wallet.account.address.pretty() }}</v-list-tile-sub-title>
                <v-list-tile-sub-title class="monospaced">{{ wallet.node }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
             <v-divider
              v-if="index + 1 < wallets.length"
              :key="index"
            ></v-divider>
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
  }
};
</script>
<style scoped>
</style>
