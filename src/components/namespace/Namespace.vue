<template>
  <v-layout column>
    <v-layout row justify-space-between>
      <h5 class="headline">Namespace</h5>
      <div>
        <v-btn
          color="primary mx-0"
          @click="registerNamespace = !registerNamespace"
        >Register Namespace</v-btn>
        <v-btn color="primary mx-0" @click="reloadNamespaceNotifier++">Reload List</v-btn>
      </div>
    </v-layout>
    <NamespaceRegistration v-if="registerNamespace" @closeComponent="registerNamespace = false"/>
    <Errors/>
    <div
      v-if="s.wallets.length > 0 
      && s.activeWallet 
      && !s.error"
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
      s: StateRepository.state,
      registerNamespace: false,
      reloadNamespaceNotifier: 0
    };
  }
};
</script>
<style scoped>
</style>
