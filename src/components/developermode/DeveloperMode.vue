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
    <v-flex xs12>
      <DeveloperModeNamespace />
    </v-flex>
  </v-layout>
</template>
<script>
import DeveloperModeConversion from './DeveloperModeConversion.vue';
import DeveloperModeAccount from './DeveloperModeAccount.vue';
import DeveloperModeNamespace from './DeveloperModeNamespace.vue';

export default {
  components: {
    DeveloperModeConversion,
    DeveloperModeAccount,
    DeveloperModeNamespace,
  },
};
</script>
<style scoped>
</style>
