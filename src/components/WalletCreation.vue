<template>
  <v-layout column>
    <v-layout row justify-space-between>
      <h5 class="headline">Wallet creation</h5>

      <div text-xs-right>
        <v-btn color="primary mx-0" v-on:click="generateAccount">Generate Account</v-btn>
      </div>
    </v-layout>
    <div v-if="!account">
      <v-alert
        :value="!account"
        type="warning"
      >You need to generate an account first to create a wallet</v-alert>
    </div>
    <v-scale-transition>
      <div v-show="account">
        <v-layout row align-center>
          <v-flex xs3>
            <v-subheader>Address</v-subheader>
          </v-flex>
          <v-flex xs9>
            <div class="body-2" v-if="account">{{account.address.pretty()}}</div>
          </v-flex>
        </v-layout>
        <v-layout row align-center>
          <v-flex xs3>
            <v-subheader>Public Key</v-subheader>
          </v-flex>
          <v-flex xs9>
            <div v-if="account">{{account.publicKey}}</div>
          </v-flex>
        </v-layout>
        <v-layout row align-center>
          <v-flex xs3>
            <v-subheader>Private Key</v-subheader>
          </v-flex>
          <v-flex xs9>
            <div v-if="account">{{account.privateKey}}</div>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs3>
            <v-subheader>NEM2 node URL</v-subheader>
          </v-flex>
          <v-flex xs9>
            <v-text-field v-model="node" label="NEM2 node URL" box></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row justify-end>
          <v-btn
            v-on:click="dialog = true"
            :disabled="node == '' || account == null"
            color="primary mx-0"
          >Create Wallet</v-btn>
        </v-layout>
      </div>
    </v-scale-transition>
  </v-layout>
</template>
<script>
import { NetworkType, Account } from "nem2-sdk";
import StateRepository from "../infrastructure/StateRepository.js";

export default {
  data: function() {
    return {
      account: null,
      node: ""
    };
  },
  methods: {
    generateAccount: function() {
      this.account = Account.generateNewAccount(NetworkType.MIJIN_TEST);
    },
    save: function() {}
  }
};
</script>
<style scoped>
</style>
