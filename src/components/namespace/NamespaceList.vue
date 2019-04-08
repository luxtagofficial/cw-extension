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
      <v-list
        three-line
        class="py-0"
      >
        <v-slide-y-transition
          group
          tag="v-list"
          class="py-0"
        >
          <template v-for="(ns, index) in namespaces">
            <v-layout
              :key="ns.name"
              column
            >
              <v-list-tile
                avatar
                ripple
              >
                <v-list-tile-content class="my-2">
                  <v-list-tile-title>{{ ns.name }} - <span class="">{{ ns.hexId }}</span></v-list-tile-title>
                  <v-list-tile-sub-title>
                    <div class="monospaced">
                      {{ ns.expire }}
                    </div>
                  </v-list-tile-sub-title>
                  <v-list-tile-sub-title>
                    <div class="monospaced">
                      {{ ns.type }} {{ ns.alias }}
                    </div>
                  </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn
                    icon
                    @click="ns.expand.isExpandMore = !ns.expand.isExpandMore"
                  >
                    <v-icon> {{ ns.expand.isExpandMore ? "expand_more" : "expand_less" }} </v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
              <v-layout>
                <AliasTransaction
                  class="pa-3"
                  v-show="ns.expand.isExpandMore"
                  :alias-action-type="ns.expand.aliasActionType"
                  :namespace-name="ns.expand.namespaceName"
                  :current-alias="ns.expand.currentAlias"
                  :current-alias-type="ns.expand.currentAliasType"
                />
              </v-layout>
            </v-layout>
            <v-divider
              v-if="index + 1 < namespaces.length"
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
  NamespaceHttp, UInt64, BlockchainHttp, Address, AliasActionType,
} from 'nem2-sdk';
import { mergeMap } from 'rxjs/operators';
import StateRepository from '../../infrastructure/StateRepository.js';
import AliasTransaction from './AliasTransaction';


function info2view(namespacesInfo, blockHeight) {
  return namespacesInfo.filter((ns, index, namespaces) => {
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
    const expireWithin = ns.namespaceInfo.endHeight.compact() - blockHeight;
    const expireText = expireWithin > 0 ? `expire within ${expireWithin} blocks` : `expired ${-expireWithin} blocks ago`;
    return {
      name,
      hexId: ns.namespaceInfo.id.toHex().toUpperCase(),
      type: aliasType,
      alias: aliasText,
      expire: expireText,
      expand: {
        isExpandMore: false,
        namespaceName: name,
        aliasActionType:
          ns.namespaceInfo.alias.type === 0 ? AliasActionType.Link : AliasActionType.Unlink,
        currentAliasType: ns.namespaceInfo.alias.type,
        currentAlias: ns.namespaceInfo.alias.type === 0 ? '' : aliasText,
      },
    };
  });
}


export default {
  components: { AliasTransaction },
  props: {
    reloadNamespaceNotifier: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  data() {
    return {
      noWallets: StateRepository.wallets().length === 0,
      sharedState: StateRepository.state,
      namespaces: [],
    };
  },
  computed: {
    activeWallet() {
      return this.sharedState.activeWallet;
    },
  },
  watch: {
    activeWallet: {
      handler() {
        this.reloadNamespaces();
      },
    },
    reloadNamespaceNotifier: {
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
      this.namespaces = [];
      const namespaces = {};
      const endpoint = this.activeWallet.node;
      const { address } = this.activeWallet.account;
      const blockChainHttp = new BlockchainHttp(endpoint);
      const blockHeight = (await blockChainHttp.getBlockchainHeight().toPromise()).compact();
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
        const namespacesInfo = namespacesName.map((namespaceName) => {
          const namespace = namespaces[namespaceName.namespaceId.toHex().toUpperCase()];
          namespace.namespaceName = namespaceName;
          return namespace;
        });
        this.namespaces = info2view(namespacesInfo, blockHeight);
      });
    },
  },
};

</script>
<style scoped>
</style>
