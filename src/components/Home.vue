<template>
  <v-layout column xs12>
    <v-layout row mb-4>
      <v-layout row fill-height justify-start pl-3 xs12>
        <h5 class="headline pt-3">Information</h5>
      </v-layout>
    </v-layout>
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
              <div class="monospaced clearfix homeLine">
                <span class="clearfix">Public key:</span>
                <span class="clearfix">{{sharedState.accountInfo.publicKey}}</span>
                <span class="clearfix">Current node:</span>

                <a
                  class="clearfix"
                  :href="nodeURL"
                  target="_new"
                >{{ sharedState.activeWallet.node }}</a>
              </div>
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