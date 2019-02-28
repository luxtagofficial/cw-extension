<template>
  <v-app>
    <v-content>
      <v-container>
        <div>Hello firefox extension. I am Vue!
          <br>
          <a href="wallet.html" target="_blank" v-on:click="closePopup">open wallet</a>
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
