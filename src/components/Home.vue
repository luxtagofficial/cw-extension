<template>
  <v-layout column>
    <h5 class="headline">Information</h5>
    <p class="monospaced" v-if="sharedState.activeWallet">Active Wallet Address: {{sharedState.activeWallet.account.address.pretty()}}</p>
  </v-layout>
</template>
<script>
import StateRepository from '../infrastructure/StateRepository.js';

export default {
  data: () => ({
    sharedState: StateRepository.state
  }),
};
</script>
<style scoped>
</style>
