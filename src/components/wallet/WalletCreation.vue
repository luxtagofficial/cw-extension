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
  <v-card>
    <v-card-title primary-title>
      <h3 class="headline mb-3">
        Generate a new wallet
      </h3>
      <p class="mb-0">
        This wallet will be saved in your browser storage,&nbsp;
        but make sure to back-up your private if you need to use it later!
      </p>
    </v-card-title>
    <v-card-text>
      <v-text-field
        :value="account ? account.address.pretty() : ''"
        class="ma-0 pa-0 monospaced"
        label="Main wallet"
        readonly
      />

      <v-text-field
        :value="account ? account.publicKey : ''"
        class="ma-0 pa-0 monospaced"
        label="Main wallet"
        readonly
      />

      <v-text-field
        :value="account ? account.privateKey : ''"
        class="ma-0 pa-0 monospaced"
        label="Main wallet"
        readonly
      />

      <v-text-field
        v-model="node"
        class="ma-0 pa-0"
        label="NEM2 node URL"
      />

      <v-text-field
        v-model="walletName"
        class="ma-0 pa-0"
        label="Main wallet"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
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
    </v-card-actions>
  </v-card>
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
