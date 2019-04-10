<template>
  <span>
    <v-select
      v-if="walletName"
      v-model="walletName"
      :items="wallets"
      prepend-icon="payment"
      label="No Wallet Selected"
      solo
    />
    <div v-else><v-btn
      small
      color="error"
      to="/wallet"
    >No wallets</v-btn></div>
  </span>
</template>
<script>
import StateRepository from '../infrastructure/StateRepository';

export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    walletName: String,
    // eslint-disable-next-line vue/require-default-prop
    wallets: Array,
  },
  data: () => ({
    sharedState: StateRepository.state,
  }),
  watch: {
    walletName:
    (val) => {
      if (val) {
        StateRepository.onWalletChange(val);
      }
    },
  },
};
</script>
<style scoped>
</style>
