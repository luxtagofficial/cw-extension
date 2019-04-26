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
  <div>
    <v-icon
      v-if="application.darkMode"
      class="icons dark"
      large
      @click="$store.dispatch('application/TOGGLE_DARK_MODE')"
    >
      wb_sunny
    </v-icon>
    <v-icon
      v-if="!application.darkMode"
      class="icons dark"
      large
      @click="$store.dispatch('application/TOGGLE_DARK_MODE')"
    >
      brightness_2
    </v-icon>
    <v-icon
      class="icons pointer wallet"
      large
      @click.stop="goToWallet"
    >
      payment
    </v-icon>
    <v-select
      v-if="walletName"
      v-model="walletName"
      :items="wallets"
      label="No Wallet Selected"
      class="select"
      solo
    />
  </div>
</template>
<script>
import { mapState } from 'vuex';

import store from '../store/index';

export default {
  store,
  props: {
    // eslint-disable-next-line vue/require-default-prop
    walletName: String,
    // eslint-disable-next-line vue/require-default-prop
    wallets: Array,
  },
  computed: mapState([
    'application',
  ]),
  watch: {
    walletName(newActiveWalletName) {
      if (newActiveWalletName) {
        this.$store.dispatch('wallet/SET_ACTIVE_WALLET', newActiveWalletName);
      }
    },
  },
  methods: {
    goToWallet() {
      this.$router.push('/wallet');
    },
  },
};
</script>
<style scoped>
.icons {
  display: block;
  position: relative;
  float: left;
  padding-top: 8px;
}

.wallet {
  padding-right: 23px;
}

.dark {
  padding-right: 18px;
}

.select {
  max-width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

</style>
