<template>
  <v-layout column>
    <h5 class="headline">Information</h5>
    <Errors :sharedState="sharedState"/>
    <div
      v-if="sharedState.wallets.length > 0 
        && sharedState.activeWallet 
        && !sharedState.error
        && !sharedState.loading_getAccountInfo"
    >
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h5 class="headline mb-0">{{sharedState.activeWallet.name}}</h5>
              <div
                class="monospaced clearfix homeLine"
              >Address: {{sharedState.activeWallet.account.address.pretty()}}</div>
              <div
                class="monospaced clearfix homeLine"
              >Public key: {{sharedState.accountInfo.publicKey}}</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </div>
  </v-layout>
</template>
<script>
import StateRepository from "../infrastructure/StateRepository.js";
import Errors from "./Errors.vue";

export default {
  components: {
    Errors
  },
  data() {
    return { sharedState: StateRepository.state };
  }
};
</script>
<style scoped>
</style>