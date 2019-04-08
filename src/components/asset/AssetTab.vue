<template>
  <div>
    <div v-if="assets.length === 0">
      <v-flex xs12>
        <v-alert :value="true" type="info">There is nothing to show here!</v-alert>
      </v-flex>
    </div>
    <div v-if="assets.length > 0">
      <v-list three-line class="py-0 pa-0">
        <v-list-group v-for="(a, index) in assets" :key="index" :prepend-icon="a.action" no-action>
          <template v-slot:activator>
            <v-list-tile ripple color="a.active?green:blue">
              <v-list-tile-content class="my-2">
                <v-list-tile-title>{{ a.title }}</v-list-tile-title>
                <v-list-tile-sub-title
                  class="text--primary"
                >Balance: {{ parseInt(a.balance).toLocaleString() }} [{{ a.amount }}]</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ a.expirationText }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <v-list-tile-content>
            <div class="p17">
              <v-list-tile-title>Meta ID: {{ a.metaId }}</v-list-tile-title>
              <v-list-tile-sub-title>Owner: {{ a.owner }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>supply: {{ a.supply.toLocaleString() }} | divisibility: {{ a.divisibility }} | supplyMutable: {{a.supplyMutable}} | transferable: {{a.transferable}}</v-list-tile-sub-title>
            </div>
          </v-list-tile-content>
        </v-list-group>
        <v-divider/>
      </v-list>
    </div>
  </div>
</template>

<script>
import StateRepository from "../../infrastructure/StateRepository.js";

export default {
  name: "AssetTab",
  props: {
    assets: {
      type: Array
    }
  },
  data() {
    return {
      index: 0
    };
  }
};
</script>

<style scoped>
</style>
