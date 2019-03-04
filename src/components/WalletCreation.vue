<template>
  <v-layout column>
    <h5 class="headline">Wallet creation</h5>
    <div>
    <v-btn color="primary mx-0">Generate Account</v-btn>
    </div>
  </v-layout>
</template>
<script>
export default {
  methods: {
    closePopup: event => {
      setTimeout(() => window.close(), 50);
    }
  }
};
</script>
<style scoped>
</style>
