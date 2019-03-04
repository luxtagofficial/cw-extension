<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <div class="fixedHeightContainer">
          <v-layout align-center justify-center column fill-height>
            <h1>Catapult Wallet 0.0.1</h1>
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
