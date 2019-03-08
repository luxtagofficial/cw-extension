<template>
  <v-layout column>
    <h5 class="headline">Transaction handled</h5>
    <p>{{transaction}}</p>
  </v-layout>
</template>
<script>
export default {
  data: function () {
    return { transaction: {} }
  },
  created: function () {
    const transactionQuery = this.$route.query.transaction;
    this.transaction = JSON.parse(this.$route.query.transaction.substring(
      'web+nem://transaction?data='.length, transactionQuery.length));
  }
};
</script>
<style scoped>
</style>
