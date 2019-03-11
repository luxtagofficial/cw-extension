<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <div class="fixedHeightContainer">
          <v-layout align-center justify-center column fill-height>
            <h5 class="headline">NEM2 Wallet 0.0.1</h5>
            <v-btn
              color="primary"
              dark
              href="wallet.html"
              target="_blank"
              v-on:click="closePopup"
            >Create a Wallet</v-btn>
          </v-layout>
        </div>
      </v-container>
    </v-content>
  </v-app>
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
.fixedHeightContainer {
  height: 400px;
}
</style>
