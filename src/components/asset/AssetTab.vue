<template>
  <div>
    <div v-if="assets.length === 0">
      <v-flex xs12>
        <v-alert
          :value="true"
          type="info"
        >
          There is nothing to show here!
        </v-alert>
      </v-flex>
    </div>
    <div v-if="assets.length > 0">
      <AssetModification
        v-show="modifyAsset"
        :active-asset="activeAsset"
        @closeComponent="modifyAsset = false"
      />
      <v-list
        three-line
        class="py-0 pa-0"
      >
        <v-list-group
          v-for="(a, i) in assets"
          :key="i"
          :prepend-icon="a.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-tile
              ripple
              color="a.active?green:blue"
            >
              <v-list-tile-content class="my-2">
                <div class="asset-list-header asset-list-header-container">
                  <div class="asset-list-header asset-list-header-left">
                    <v-list-tile-title>{{ a.title }}</v-list-tile-title>
                    <v-list-tile-sub-title
                      class="text--primary"
                    >
                      Balance:&nbsp;
                      {{ parseInt(a.balance).toLocaleString() }}&nbsp;
                      [{{ (a.amount/Math.pow(10, a.divisibility)).toLocaleString() }}]
                    </v-list-tile-sub-title>
                    <v-list-tile-sub-title>{{ a.expirationText }}</v-list-tile-sub-title>
                  </div>
                  <div class="asset-list-header asset-list-header-right">
                    <div v-if="ownedAssets">
                      <v-btn
                        small
                        color="primary"
                        :disabled="!a.active"
                        @click.stop
                      >
                        Link a namespace
                      </v-btn>
                      <v-btn
                        small
                        color="primary"
                        :disabled="
                          !(a.active
                            && a.supplyMutable)
                        "
                        @click.stop="
                          modifyAsset = !modifyAsset;
                          activeAsset = a.id;
                        "
                      >
                        Modify supply
                      </v-btn>
                    </div>
                  </div>
                </div>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <v-list-tile-content>
            <div class="asset-detail">
              <v-list-tile-title>Meta ID: {{ a.metaId }}</v-list-tile-title>
              <v-list-tile-sub-title>Owner: {{ a.owner }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>
                supply: {{ a.supply.toLocaleString() }} | divisibility: {{ a.divisibility }} |&nbsp;
                supplyMutable: {{ a.supplyMutable }} | transferable: {{ a.transferable }}
              </v-list-tile-sub-title>
            </div>
          </v-list-tile-content>
        </v-list-group>
        <v-divider />
      </v-list>
    </div>
  </div>
</template>

<script>
import AssetModification from './AssetModification.vue';

export default {
  name: 'AssetTab',
  components: {
    AssetModification,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    assets: {
      type: Array,
    },
    ownedAssets: {
      type: Boolean,
      default() { return false; },
    },
    activeAsset: {
      type: String,
      default() { return ''; },
    },
  },
  data() {
    return {
      index: 0,
      modifyAsset: false,
    };
  },
};
</script>

<style scoped>
</style>
