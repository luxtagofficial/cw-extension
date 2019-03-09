<template>
  <v-layout column>
    <h5 class="headline">Wallet creation</h5>
    <div>
      <v-btn color="primary mx-0" v-on:click="generateAccount">Generate Account</v-btn>
    </div>
    <div v-if="account">
      <p>Address: {{account.address.pretty()}}</p>
      <p>Public Key: {{account.publicKey}}</p>
      <p>Private Key: {{account.privateKey}}</p>
    </div>
  </v-layout>
</template>
<script>
const nem2Sdk = require("nem2-sdk");
const NetworkType = nem2Sdk.NetworkType,
    Account = nem2Sdk.Account;

export default {
  data: function() {
    return {
      account: null
    }
  },
  methods: {
    generateAccount: function () {
      this.account = Account.generateNewAccount(NetworkType.MIJIN_TEST);
    }
  }
};
</script>
<style scoped>
</style>
