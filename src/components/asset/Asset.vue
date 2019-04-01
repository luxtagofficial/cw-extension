<template>
  <v-layout column>
    <v-layout
      row
      justify-space-between
    >
      <h5 class="headline">
        Assets
      </h5>
      <div>
        <v-btn
          color="primary mx-0"
          @click="createAsset = !createAsset"
        >
          Create Asset
        </v-btn>
      </div>
    </v-layout>
    <AssetCreation
      v-show="createAsset"
      @closeComponent="createAsset = false"
    />
    <v-layout
      row
      justify-space-between
      align-center
    >
      <h5 class="subheading">
        List
      </h5>
      <div>
        <v-btn
          color="primary mx-0"
          @click="reloadAssetNotifier++"
        >
          Reload List
        </v-btn>
      </div>
    </v-layout>
    <AssetList
      class="my-2"
      :reload-asset-notifier="reloadAssetNotifier"
    />
  </v-layout>
</template>
<script>
import AssetCreation from './AssetCreation.vue';
import AssetList from './AssetList.vue';

export default {
  components: {
    AssetCreation,
    AssetList,
  },
  data() {
    return {
      createAsset: false,
      reloadAssetNotifier: 0,
    };
  },
};
</script>
<style scoped>
</style>
