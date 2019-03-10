<template>
  <v-layout column>
    <v-flex xs12>
      <h5 class="headline">Developer mode</h5>
    </v-flex>
    <v-flex xs12>
      <v-alert :value="true" type="warning">
        This section is under development. See GitHub issue
        <a
          href="https://github.com/aleixmorgadas/cw-extension/issues/1"
          target="_blank"
        >here</a>
      </v-alert>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data: function() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
</style>
