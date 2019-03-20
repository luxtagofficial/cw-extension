<template>
  <v-layout column>
    <div v-show="noWallets">
      <v-layout
        column
        justify-center
        ma-5
        text
        class="text-md-center"
      >
        <v-icon
          x-large
          color="orange darken-2"
        >
          warning
        </v-icon>
        <span>You have no wallets configured</span>
      </v-layout>
    </div>
    <div
      v-show="!noWallets"
      class="py-0"
    >
      <v-layout justify-end>
        <v-btn @click="reloadNamespaces">
          Reload
        </v-btn>
      </v-layout>
      <v-list
        two-line
        class="py-0"
      >
        <v-slide-y-transition
          group
          tag="v-list"
          class="py-0"
        >
          <template v-for="(namespace, index) in namespaces">
            <v-list-tile
              :key="namespace.name"
              avatar
              ripple
            >
              <v-list-tile-content class="my-2">
                <v-list-tile-title>{{ namespace.name }}</v-list-tile-title>
                <v-list-tile-sub-title class="monospaced-bold">
                  {{ namespace.hexId }}
                </v-list-tile-sub-title>
                <v-list-tile-sub-title class="monospaced">
                  {{ namespace.expire }}
                </v-list-tile-sub-title>
                <v-list-tile-sub-title class="monospaced">
                  {{ namespace.type }} {{ namespace.alias }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider
              v-if="index + 1 < namespacesInfo.length"
              :key="index"
            />
          </template>
        </v-slide-y-transition>
      </v-list>
    </div>
  </v-layout>
</template>
<script>
import {
  NamespaceHttp, UInt64, BlockchainHttp, Address,
} from 'nem2-sdk';
import { mergeMap } from 'rxjs/operators';
import StateRepository from '../../infrastructure/StateRepository.js';

export default {
  data() {
    return {
      noWallets: StateRepository.wallets().length === 0,
      sharedState: StateRepository.state,
      namespacesInfo: [],
      blockHeight: 0,
    };
  },
  computed: {
    activeWallet() {
      return this.sharedState.activeWallet;
    },
    namespaces() {
      return this.namespacesInfo.filter((ns, index, namespaces) => {
        for (let i = 0; i < index; i += 1) {
          if (ns === namespaces[i]) return false;
        }
        return true;
      }).sort((a, b) => {
        const nameA = a.namespaceInfo.metaId;
        const nameB = b.namespaceInfo.metaId;
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }).map((ns, index, original) => {
        const name = ns.namespaceInfo.levels.map(level => original.find(n => n.namespaceInfo.id.equals(level))).map(n => n.namespaceName.name).join('.');
        let aliasText;
        let aliasType;
        switch (ns.namespaceInfo.alias.type) {
          case 1:
            aliasText = (new UInt64(ns.namespaceInfo.alias.mosaicId)).toHex().toUpperCase();
            aliasType = 'mosaic alias:';
            break;
          case 2:
            aliasText = Address.createFromEncoded(ns.namespaceInfo.alias.address).pretty();
            aliasType = 'address alias:';
            break;
          default:
            aliasText = '';
            aliasType = 'no alias';
            break;
        }
        const expireWithin = ns.namespaceInfo.endHeight.compact() - this.blockHeight;
        const expireText = expireWithin > 0 ? `expire within ${expireWithin} blocks` : `expired ${-expireWithin} blocks ago`;
        return {
          name,
          hexId: ns.namespaceInfo.id.toHex().toUpperCase(),
          type: aliasType,
          alias: aliasText,
          expire: expireText,
        };
      });
    },
  },
  watch: {
    activeWallet: {
      handler() {
        this.reloadNamespaces();
      },
    },
  },
  mounted() {
    this.reloadNamespaces();
  },
  methods: {
    async reloadNamespaces() {
      if (this.activeWallet == null) return;
      this.namespacesInfo = [];
      const namespaces = {};
      const endpoint = this.activeWallet.node;
      const { address } = this.activeWallet.account;
      const blockChainHttp = new BlockchainHttp(endpoint);
      this.blockHeight = (await blockChainHttp.getBlockchainHeight().toPromise()).compact();
      const namespaceHttp = new NamespaceHttp(endpoint);
      namespaceHttp.getNamespacesFromAccount(address).pipe(
        mergeMap((namespacesInfo) => {
          const namespaceIds = namespacesInfo.map((x) => {
            namespaces[x.id.toHex().toUpperCase()] = { namespaceInfo: x };
            return x.id;
          });
          return namespaceHttp.getNamespacesName(namespaceIds);
        }),
      ).subscribe((namespacesName) => {
        this.namespacesInfo = namespacesName.map((namespaceName) => {
          const namespace = namespaces[namespaceName.namespaceId.toHex().toUpperCase()];
          namespace.namespaceName = namespaceName;
          return namespace;
        });
      });
    },
  },
};
</script>
<style scoped>
</style>
