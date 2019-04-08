<template>
  <v-layout column>
    <v-layout row justify-space-between>
      <h5 class="headline">Assets</h5>
      <div>
        <v-btn color="primary mx-0" @click="createAsset = !createAsset">Create Asset</v-btn>
        <v-btn color="primary mx-0" @click="reloadList">Reload List</v-btn>
      </div>
    </v-layout>
    <Errors/>
    <div
      v-if="s.wallets.length > 0 
      && s.activeWallet 
      && !s.error"
    >
      <AssetCreation v-show="createAsset" @closeComponent="createAsset = false"/>
      <AssetList class="my-2"/>
    </div>
  </v-layout>
</template>
<script>
import StateRepository from "../../infrastructure/StateRepository.js";
import Errors from "../Errors.vue";
import AssetCreation from "./AssetCreation.vue";
import AssetList from "./AssetList.vue";

export default {
  components: {
    Errors,
    AssetCreation,
    AssetList
  },
  data() {
    return {
      s: StateRepository.state,
      createAsset: false,
      reloadAssetNotifier: 0
    };
  },
  methods: {
    reloadList: function(e) {
      StateRepository.loadMosaics();
    }
  }
};
</script>
<style scoped>
</style>