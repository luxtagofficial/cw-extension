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
    <v-layout v-if="isValidAccount" row align-center>
      <v-flex xs3>
        <v-subheader>Address</v-subheader>
      </v-flex>
      <v-flex xs9>
        <div class="monospaced-bold">{{account.address.pretty()}}</div>
      </v-flex>
    </v-layout>
    <v-layout v-if="isValidAccount" row align-center>
      <v-flex xs3>
        <v-subheader>Public Key</v-subheader>
      </v-flex>
      <v-flex xs9>
        <div class="monospaced">{{account.publicKey}}</div>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs3>
        <v-subheader>NEM2 node URL</v-subheader>
      </v-flex>
      <v-flex xs9>
        <v-text-field v-model="node" class="ma-0 pa-0" label="NEM2 node URL" solo>{{node}}</v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs3>
        <v-subheader>Wallet name</v-subheader>
      </v-flex>
      <v-flex xs9>
        <v-text-field v-model="walletName" class="ma-0 pa-0" label="Main wallet" solo></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs3>
        <v-subheader>Private Key</v-subheader>
      </v-flex>
      <v-flex xs9>
        <v-text-field
          v-model.lazy="privateKey"
          class="ma-0 pa-0"
          label="Private Key (64 char)"
          solo
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row justify-end align-center>
      <v-btn flat v-on:click="$emit('closeComponent')">Close</v-btn>
      <v-btn
        v-on:click="save"
        :disabled="node == '' || walletName == '' || !isValidAccount"
        color="primary mx-0"
      >Create Wallet</v-btn>
    </v-layout>
  </v-layout>
</template>
<script>
import { NetworkType, Account } from "nem2-sdk";
import StateRepository from "../../infrastructure/StateRepository.js";

export default {
  data: function() {
    return {
      sharedState: StateRepository.state,
      node: "",
      walletName: "",
      account: {},
      privateKey: "",
      isValidAccount: false
    };
  },
  methods: {
    regenerateAccount: function() {
      this.account = Account.generateNewAccount(NetworkType.MIJIN_TEST);
    },
    save: function() {
      if (
        this.sharedState.wallets.findIndex(
          ({ name }) => name === this.walletName
        ) === -1
      ) {
        StateRepository.storeWallet(this.walletName, this.account, this.node);
        this.node = "";
        this.walletName = "";
        this.privateKey = "";
        this.account = {};
      }
    },
    createFromPrivateKey: function(e) {
      const key =
        this.privateKey.length === 64 ? this.privateKey.toUpperCase() : false;
      if (key) {
        try {
          this.account = Account.createFromPrivateKey(
            key,
            NetworkType.MIJIN_TEST
          );
          this.isValidAccount = true;
        } catch (error) {
          this.isValidAccount = false;
        }
      } else {
        this.account = {};
        this.isValidAccount = false;
      }
    }
  },
  watch: {
    privateKey: function(e) {
      this.createFromPrivateKey(this.privateKey);
    }
  }
};
</script>
<style scoped>
</style>
