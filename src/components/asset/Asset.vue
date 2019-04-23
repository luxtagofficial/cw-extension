// Copyright (C) 2019 Contributors as noted in the AUTHORS file
//
// This file is part of nem2-wallet-browserextension.
//
// nem2-wallet-browserextension is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// nem2-wallet-browserextension is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with nem2-wallet-browserextension.  If not, see http://www.gnu.org/licenses/.

<template>
  <v-layout
    column
    xs12
  >
    <v-layout
      row
      mb-4
    >
      <v-layout
        row
        fill-height
        justify-start
        pl-3
        xs3
      >
        <h5 class="headline pt-3">
          Assets
        </h5>
      </v-layout>
      <v-layout
        row
        fill-height
        justify-end=""
        xs9
      >
        <v-btn
          color="primary mx-0"
          @click="reloadList(wallet.activeWallet)"
        >
          Reload List
        </v-btn>
        <v-btn
          class="ml-3"
          color="primary mx-0"
          @click="createAsset = !createAsset"
        >
          Create Asset
        </v-btn>
      </v-layout>
    </v-layout>
    <Errors />
    <div
      v-if="wallet.wallets.length > 0
        && wallet.activeWallet
        && !application.error"
    >
      <AssetCreation
        v-show="createAsset"
        @closeComponent="createAsset = false"
      />
      <AssetList class="my-2" />
    </div>
  </v-layout>
</template>
<script>
import { mapState } from 'vuex';
import store from '../../store/index';
import Errors from '../Errors.vue';
import AssetCreation from './AssetCreation.vue';
import AssetList from './AssetList.vue';

export default {
  name: 'Assets',
  store,
  components: {
    Errors,
    AssetCreation,
    AssetList,
  },
  data() {
    return {
      createAsset: false,
      reloadAssetNotifier: 0,
    };
  },
  computed: mapState([
    'wallet',
    'application',
    'assets',
  ]),
  methods: {
    reloadList(wallet) {
      this.$store.dispatch('assets/GET_ASSETS_BY_ADDRESS', { wallet });
    },
  },
};
</script>
<style scoped>
</style>
