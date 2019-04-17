<template>
  <v-layout column>
    <h1 class="headline pt-3">About nem2-wallet</h1>

    <h2 class="sub-headline pt-3">For users</h2>

    <v-layout column>
      <v-flex>
        <h2 class="sub-headline pt-3">For developers</h2>

        <v-layout class="align-center ml-0 mb-1">
          <b>Source code repository:</b>
          <a
            href="https://github.com/aleixmorgadas/nem2-wallet-browserextension"
            class="mx-1"
          >https://github.com/aleixmorgadas/nem2-wallet-browserextension</a> licenced under
          <img
            src="https://img.shields.io/badge/License-Apache%202.0-blue.svg"
            class="ml-1"
          >
        </v-layout>

        <ul class="mt-3 faq">
          <li>How can I contribute?</li>
        </ul>
        <p>TODO</p>
        <ul class="mt-3 faq">
          <li>How can I integrate a web-application with this wallet?</li>
        </ul>
        <p>TODO</p>
      </v-flex>
    </v-layout>
  </v-layout>
</template>
<script>
export default {};
</script>
<style scoped>
.sub-headline {
  font-size: 20px;
  font-weight: 400;
}
.faq {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 0.5em;
}
</style>
