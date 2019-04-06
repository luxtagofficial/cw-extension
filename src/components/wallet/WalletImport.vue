<template>
  <v-scale-transition>
    <v-layout column>
      <div v-if="isValidAccount">
        <v-layout row align-center>
          <v-flex xs3>
            <v-subheader>Address</v-subheader>
          </v-flex>
          <v-flex xs9>
            <div class="monospaced-bold">{{account.address.pretty()}}</div>
          </v-flex>
        </v-layout>
        <v-layout row align-center>
          <v-flex xs3>
            <v-subheader>Public Key</v-subheader>
          </v-flex>
          <v-flex xs9>
            <div class="monospaced">{{account.publicKey}}</div>
          </v-flex>
        </v-layout>
      </div>
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
  </v-scale-transition>
</template>
<script>
import { NetworkType, Account } from "nem2-sdk";
import StateRepository from "../../infrastructure/StateRepository.js";

export default {
  data: function() {
    return {
      node: "http://13.114.200.132:3000",
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
      StateRepository.storeWallet(this.walletName, this.account, this.node);
      this.node = "";
      this.walletName = "";
    },
    createFromPrivateKey: function(e) {
      const key =
        this.privateKey.length === 64 ? this.privateKey.toUpperCase() : false;
      if (key) {
        console.log(key, "KEY");
        try {
          this.account = Account.createFromPrivateKey(
            key,
            NetworkType.MIJIN_TEST
          );
          this.isValidAccount = true;
          console.log(this.account, "oijdfozejfzo");
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
