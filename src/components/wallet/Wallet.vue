<template>
  <v-layout column>
    <v-layout row justify-space-between align-center>
      <h5 class="headline">Wallet</h5>
      <div>
        <v-btn color="primary mx-0" v-on:click="createWallet = true">Create Wallet</v-btn>
      </div>
    </v-layout>
    <WalletCreation v-show="createWallet" v-on:closeComponent='createWallet = false'/>
    <WalletList class="my-2"/>
  </v-layout>
</template>
<script>
import WalletCreation from "./WalletCreation.vue";
import WalletList from "./WalletList.vue";

export default {
  data: function() {
    return {
      createWallet: false,
    }
  },
  components: {
    WalletCreation,
    WalletList
  }
};
</script>
<style scoped>
</style>
