<template>
  <v-layout column>
    <div v-if="sharedState.loading_getMosaicsByAddress">
      <v-progress-linear :indeterminate="true"></v-progress-linear>
    </div>
    <div v-if="!sharedState.loading_getMosaicsByAddress 
    && sharedState.assets.length === 0">
      <v-flex xs12>
        <v-alert :value="true" type="info">This account does not own nor hold any asset.</v-alert>
      </v-flex>
    </div>
    <div v-if="!sharedState.loading_getMosaicsByAddress 
    && sharedState.assets.length > 0">
      <div>
        <v-tabs v-model="active" color="cyan" dark slider-color="yellow">
          <v-tab :key="1" ripple>Holdings</v-tab>
          <v-tab-item :key="1">
            <AssetTab :assets="filterZeros(sharedState.assets)"/>
          </v-tab-item>
          <v-tab :key="2" ripple>Owned Assets</v-tab>
          <v-tab-item :key="2">
            <AssetTab :assets="filterByOwner(sharedState.assets, sharedState.activeWallet.account.address.pretty())"/>
          </v-tab-item>
        </v-tabs>
      </div>
    </div>
  </v-layout>
</template>

<script>
import StateRepository from "../../infrastructure/StateRepository.js";
import AssetTab from "./AssetTab.vue";

export default {
  name: "AssetList",
  components: {
    AssetTab
  },
  data() {
    return {
      sharedState: StateRepository.state,
      active: null
    };
  },
  methods: {
    filterByOwner(array, owner) {
      return array.filter(x => x.owner === owner);
    },
    filterZeros(array) {
      return array.filter(x => x.balance > 0);
    }
  }
};
</script>

<style scoped>
</style>
