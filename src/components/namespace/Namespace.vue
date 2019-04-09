<template>
  <v-layout column xs12>
    <v-layout row mb-4>
      <v-layout row fill-height justify-start pl-3 xs3>
        <h5 class="headline pt-3">Namespace</h5>
      </v-layout>
      <v-layout row fill-height justify-end xs9>
        <v-btn color="primary mx-0" @click="reloadNamespaceNotifier++">Reload List</v-btn>
        <v-btn
          class="ml-3"
          color="primary mx-0"
          @click="registerNamespace = !registerNamespace"
        >Register Namespace</v-btn>
      </v-layout>
    </v-layout>

    <Errors :sharedState="sharedState"/>
    <NamespaceRegistration v-if="registerNamespace" @closeComponent="registerNamespace = false"/>
    <div
      v-if="sharedState.wallets.length > 0 
      && sharedState.activeWallet 
      && !sharedState.error"
    >
      <v-layout row justify-space-between align-center>
        <h5 class="subheading">List</h5>
        <div></div>
      </v-layout>
      <NamespaceList class="my-2" :reload-namespace-notifier="reloadNamespaceNotifier"/>
    </div>
  </v-layout>
</template>
<script>
import StateRepository from "../../infrastructure/StateRepository.js";
import Errors from "../Errors.vue";
import NamespaceRegistration from "./NamespaceRegistration.vue";
import NamespaceList from "./NamespaceList.vue";

export default {
  components: {
    Errors,
    NamespaceRegistration,
    NamespaceList
  },
  data() {
    return {
      sharedState: StateRepository.state,
      registerNamespace: false,
      reloadNamespaceNotifier: 0
    };
  }
};
</script>
<style scoped>
</style>
