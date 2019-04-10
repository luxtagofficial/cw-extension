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
