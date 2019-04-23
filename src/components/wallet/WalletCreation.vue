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
  <v-layout column>
    <v-layout
      row
      align-center
    >
      <v-flex xs3>
        <v-subheader>Address</v-subheader>
      </v-flex>
      <v-flex xs9>
        <div class="monospaced-bold">
          {{ account ? account.address.pretty() : '' }}
        </div>
      </v-flex>
    </v-layout>
    <v-layout
      row
      align-center
    >
      <v-flex xs3>
        <v-subheader>Public Key</v-subheader>
      </v-flex>
      <v-flex xs9>
        <div class="monospaced">
          {{ account ? account.publicKey : '' }}
        </div>
      </v-flex>
    </v-layout>
    <v-layout
      row
      align-center
    >
      <v-flex xs3>
        <v-subheader>Private Key</v-subheader>
      </v-flex>
      <v-flex xs9>
        <div class="monospaced">
          {{ account ? account.privateKey : '' }}
          <v-icon
            @click="regenerateAccount"
          >
            refresh
          </v-icon>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs3>
        <v-subheader>NEM2 node URL</v-subheader>
      </v-flex>
      <v-flex xs9>
        <v-text-field
          v-model="node"
          class="ma-0 pa-0"
          label="NEM2 node URL"
          solo
        />
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs3>
        <v-subheader>Wallet name</v-subheader>
      </v-flex>
      <v-flex xs9>
        <v-text-field
          v-model="walletName"
          class="ma-0 pa-0"
          label="Main wallet"
          solo
        />
      </v-flex>
    </v-layout>
    <v-layout
      row
      justify-end
      align-center
    >
      <v-btn
        flat
        @click="$emit('closeComponent')"
      >
        Close
      </v-btn>
      <v-btn
        :disabled="node == '' || walletName == ''"
        color="primary mx-0"
        @click="save"
      >
        Create Wallet
      </v-btn>
    </v-layout>
  </v-layout>
</template>
<script>
import { NetworkType, Account } from 'nem2-sdk';
import store from '../../store/index';

export default {
  store,
  data: () => ({
    account: Account.generateNewAccount(NetworkType.MIJIN_TEST),
    node: '',
    walletName: '',
  }),
  methods: {
    regenerateAccount() {
      this.account = Account.generateNewAccount(NetworkType.MIJIN_TEST);
    },
    save() {
      const newWallet = {
        name: this.walletName,
        account: this.account,
        node: this.node,
      };
      this.$store.dispatch('wallet/ADD_WALLET', newWallet);
    },
  },
};

</script>
<style scoped>
</style>
