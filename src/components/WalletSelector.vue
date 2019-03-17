<template>
  <span>
    <v-select v-if="selectWallets.length != 0"
      :items="selectWallets"
      v-model="wallet"
      prepend-icon="payment"
      label="No Wallet Selected"
      solo
    ></v-select>
    <div v-else><v-btn small color="error" to="/wallet">No wallets</v-btn></div>
  </span>
</template>
<script>
import StateRepository from "../infrastructure/StateRepository.js";

export default {
  data: () => ({
    wallet: StateRepository.state.wallets.length == 0 ? null : StateRepository.state.wallets[0].name,
    wallets: StateRepository.state.wallets,
    selectWallets: StateRepository.wallets().map(wallet => wallet.name),
  }),
  methods: {},
  watch: {
    wallets: function(val) {
      this.selectWallets = StateRepository.wallets().map(wallet => wallet.name);
    }
  }
};
</script>
<style scoped>
</style>
