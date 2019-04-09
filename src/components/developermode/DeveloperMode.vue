<template>
  <v-layout column xs12>
    <v-layout row mb-4>
      <v-layout row fill-height justify-start pl-3 xs12>
        <h5 class="headline pt-3">Developer mode</h5>
      </v-layout>
    </v-layout>
    <v-flex xs12>
      <DeveloperModeAccount/>
    </v-flex>
    <v-flex xs12>
      <DeveloperModeConversion/>
    </v-flex>
    <v-flex xs12>
      <DeveloperModeTimestamp/>
    </v-flex>
    <v-flex xs12>
      <DeveloperModeNamespace/>
    </v-flex>
  </v-layout>
</template>
<script>
import DeveloperModeAccount from "./DeveloperModeAccount.vue";
import DeveloperModeConversion from "./DeveloperModeConversion.vue";
import DeveloperModeNamespace from "./DeveloperModeNamespace.vue";
import DeveloperModeTimestamp from "./DeveloperModeTimestamp.vue";

export default {
  components: {
    DeveloperModeAccount,
    DeveloperModeConversion,
    DeveloperModeNamespace,
    DeveloperModeTimestamp
  }
};
</script>
<style scoped>
</style>
