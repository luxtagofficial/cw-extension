<template>
  <v-layout column>
    <div class="mt-3 mb-3" v-if="sharedState.loading_getAccountInfo">
      <v-progress-linear :indeterminate="true"></v-progress-linear>
    </div>

    <div v-if="sharedState.wallets.length === 0">
      <v-alert :value="true" type="error">You have no wallets configured, please create a wallet</v-alert>
    </div>

    <div v-if="sharedState.wallets.length > 0">
      <div v-if="!sharedState.activeWallet">
        <v-alert :value="true" type="error">Please select a wallet</v-alert>
      </div>

      <div v-if="sharedState.activeWallet">
        <div v-if="sharedState.error">
          <v-alert :value="true" type="error">{{sharedState.errorMessage}}</v-alert>
        </div>
      </div>
    </div>
  </v-layout>
</template>

<script>
export default {
  name: "Errors",
  props: {
    sharedState: {
      type: Object
    }
  },
  data() {
    return {
      index: 0
    };
  }
};
</script>

<style scoped>
</style>
