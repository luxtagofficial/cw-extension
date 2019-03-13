<template>
  <v-layout column>
    <v-flex xs12>
      <h5 class="headline">
        Developer mode
      </h5>
    </v-flex>
    <v-flex xs12>
      <DeveloperModeAccount />
    </v-flex>
    <v-flex xs12>
      <DeveloperModeConversion />
    </v-flex>
  </v-layout>
</template>
<script>
import DeveloperModeConversion from './DeveloperModeConversion.vue';
import DeveloperModeAccount from './DeveloperModeAccount.vue';

export default {
  components: {
    DeveloperModeConversion,
    DeveloperModeAccount,
  },
  methods: {},
};
</script>
<style scoped>
</style>
