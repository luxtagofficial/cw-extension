<template>
  <v-layout column>
    <v-layout row justify-space-between align-center>
      <h5 class="headline">Wallet</h5>
      <div>
        <v-btn
          color="primary mx-0"
          v-on:click="createWallet = true;importWallet = false"
        >Create Wallet</v-btn>
        <v-btn
          color="primary mx-0"
          v-on:click="importWallet = true;createWallet = false"
        >Import Wallet</v-btn>
      </div>
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
