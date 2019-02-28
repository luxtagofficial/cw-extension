<template>
  <div>
    Hello firefox extension. I am Vue!

    <br>
    <a href="wallet.html" target="_blank" v-on:click="closePopup">open wallet</a>
  </div>
</template>
<script>
export default {
  methods: {
    closePopup: (event) => {
      setTimeout(() => window.close(), 50);
    }
  }
 };
</script>
