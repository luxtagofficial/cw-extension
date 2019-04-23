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
    <div class="mt-3 mb-3" v-if="sharedState.loading_getAccountInfo">
      <v-progress-linear :indeterminate="true"></v-progress-linear>
    </div>

    <div v-if="sharedState.wallets.length === 0">
      <v-alert :value="true" type="error">You have no wallets configured, please create a wallet</v-alert>
    </div>

    <div v-if="sharedState.wallets.length > 0">
      <div v-if="!sharedState.activeWallet">
        <v-alert :value="true" type="error">Please select a wallet</v-alert>
      </div>

      <div v-if="sharedState.activeWallet">
        <div v-if="sharedState.error">
          <v-alert :value="true" type="error">{{sharedState.errorMessage}}</v-alert>
        </div>
      </div>
    </div>
  </v-layout>
</template>

<script>
export default {
  name: "Errors",
  props: {
    sharedState: {
      type: Object
    }
  },
  data() {
    return {
      index: 0
    };
  }
};
</script>

<style scoped>
</style>
