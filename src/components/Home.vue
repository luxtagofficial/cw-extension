<template>
  <v-layout column>
    <h5 class="headline">Information</h5>
    <Errors/>
    <div
      v-if="s.wallets.length > 0 
        && s.activeWallet 
        && !s.error
        && !s.loading_getAccountInfo"
    >
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h5 class="headline mb-0">{{s.activeWallet.name}}</h5>
              <div
                class="monospaced clearfix homeLine"
              >Address: {{s.activeWallet.account.address.pretty()}}</div>
              <div class="monospaced clearfix homeLine">Public key: {{s.accountInfo.publicKey}}</div>
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
    return { s: StateRepository.state };
  }
};
</script>
<style scoped>
</style>
