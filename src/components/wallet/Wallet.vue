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
  <v-layout column xs12>
    <v-layout row mb-4>
      <v-layout row fill-height justify-start pl-3 xs3>
        <h5 class="headline pt-3">Wallet</h5>
      </v-layout>
      <v-layout row fill-height justify-end xs9>
        <v-btn
          color="primary mx-0"
          v-on:click="createWallet = true;importWallet = false"
        >Create Wallet</v-btn>
        <v-btn
          class="ml-3"
          color="primary mx-0"
          v-on:click="importWallet = true;createWallet = false"
        >Import Wallet</v-btn>
      </v-layout>
    </v-layout>
    <WalletCreation v-if="createWallet" v-on:closeComponent="createWallet = false"/>
    <WalletImport v-if="importWallet" v-on:closeComponent="importWallet = false"/>
    <WalletList class="my-2"/>
  </v-layout>
</template>
<script>
import WalletCreation from "./WalletCreation.vue";
import WalletImport from "./WalletImport.vue";
import WalletList from "./WalletList.vue";

export default {
  data: function() {
    return {
      createWallet: false,
      importWallet: false
    };
  },
  components: {
    WalletCreation,
    WalletImport,
    WalletList
  }
};
</script>
<style scoped>
</style>
