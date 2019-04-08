<template>
  <v-layout column>
    <div v-if="sharedState.loading_getAccountInfo">
      <v-progress-linear :indeterminate="true"></v-progress-linear>
    </div>
    <div v-if="sharedState.wallets.length === 0">
      <v-layout column justify-center xs12 text class="text-md-center">
        <v-icon x-large color="orange darken-2">warning</v-icon>
        <span>You have no wallets configured, please create a wallet</span>
      </v-layout>
    </div>
    <div v-if="sharedState.wallets.length > 0">
      <div v-if="!sharedState.activeWallet">
        <v-layout column justify-center xs12 text class="text-md-center">
          <v-icon x-large color="orange darken-2">warning</v-icon>
          <span>Please select a wallet</span>
        </v-layout>
      </div>
      <div v-if="sharedState.activeWallet">
        <div v-if="sharedState.error">
          <v-layout column justify-center xs12 text class="text-md-center">
            <v-icon x-large color="orange darken-2">warning</v-icon>
            <span>Error</span>
            <span>{{sharedState.errorMessage}}</span>
          </v-layout>
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
