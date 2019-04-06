<template>
  <v-layout column>
    <div v-show="noWallets">
      <v-layout column justify-center ma-5 text class="text-md-center">
        <v-icon x-large color="orange darken-2">warning</v-icon>
        <span>You have no wallets configured</span>
      </v-layout>
    </div>
    <div v-if="error">
      <v-layout column justify-center ma-5 text class="text-md-center">
        <v-icon x-large color="orange darken-2">warning</v-icon>
        <span v-for="i in errorMessages" :key="i.message">Error: {{i.message}}</span>
      </v-layout>
    </div>
    <div v-show="!noWallets && !error" class="py-0">
      <div v-if="loading">Loading...</div>
      <div v-if="!loading">
        <div v-if="!loading && assets.length===0">This account has no asset</div>
        <v-list three-line class="py-0">
          <v-slide-y-transition group tag="v-list" class="py-0">
            <template v-for="(as, index) in assets">
              <v-layout :key="as.title" column>
                <v-list-tile avatar ripple>
                  <v-list-tile-content class="my-2">
                    <v-list-tile-title>{{ as.title }}</v-list-tile-title>
                    <v-list-tile-sub-title>
                      <div class="monospaced-bold">{{ as.subTitle }}</div>
                    </v-list-tile-sub-title>
                    <v-list-tile-sub-title>
                      <div class="monospaced">{{ as.subSubTitle }}</div>
                    </v-list-tile-sub-title>
                    <v-list-tile-sub-title>
                      <div class="monospaced">{{ as.subSubSubTitle }}</div>
                    </v-list-tile-sub-title>
                    <v-list-tile-sub-title>
                      <div class="monospaced">{{ as.subSubSubSubTitle }}</div>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn icon @click="as.expand.isExpandMore = !as.expand.isExpandMore">
                      <v-icon>{{ as.expand.isExpandMore ? "expand_less" : "expand_more" }}</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-layout>
              <v-divider v-if="index + 1 < assets.length" :key="index"/>
            </template>
          </v-slide-y-transition>
        </v-list>
      </div>
    </div>
  </v-layout>
</template>

<script>
import {
  MosaicService,
  NetworkCurrencyMosaic,
  AccountHttp,
  MosaicHttp,
  BlockchainHttp,
  Address
} from "nem2-sdk";
import { of } from "rxjs";
import { mergeMap, flatMap, toArray, map } from "rxjs/operators";
import StateRepository from "../../infrastructure/StateRepository.js";

export default {
  name: "AssetList",
  props: {
    reloadAssetNotifier: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  data() {
    return {
      noWallets: StateRepository.wallets().length === 0,
      sharedState: StateRepository.state,
      assets: [],
      mosaicAmountViews: [],
      loading: true,
      error: false,
      errorMessages: []
    };
  },
  computed: {
    activeWallet() {
      return this.sharedState.activeWallet;
    }
  },
  watch: {
    activeWallet: {
      handler() {
        this.reloadAssets();
      }
    },
    reloadAssetNotifier: {
      handler() {
        this.reloadAssets();
      }
    }
  },
  mounted() {
    this.reloadAssets();
  },
  methods: {
    async reloadAssets() {
      this.clearError();
      if (this.activeWallet == null) return;
      this.assets = [];
      const endpoint = this.activeWallet.node;
      const { address } = this.activeWallet.account;
      //const address = Address.createFromRawAddress("SCA7ZS-2B7DEE-BGU3TH-SILYHC-RUR32Y-YE55ZB-LYA2");
      const blockChainHttp = new BlockchainHttp(endpoint);
      const blockHeight = (await blockChainHttp
        .getBlockchainHeight()
        .toPromise()).compact();
      const accountHttp = new AccountHttp(endpoint);
      const mosaicHttp = new MosaicHttp(endpoint);
      const mosaicService = new MosaicService(accountHttp, mosaicHttp);
      accountHttp
        .getAccountInfo(address)
        .pipe(
          mergeMap(accountInfo => {
            return accountInfo.mosaics.length !== 0 ? of(true) : of(false);
          })
        )
        .subscribe(
          hasMosaics => {
            if (hasMosaics) {
              this.getMosaics(address, blockHeight);
            } else {
              this.assets = [];
              this.loading = false;
            }
          },
          err => {
            // @TODO: rationalize
            this.error = true;
            if (
              err.response &&
              JSON.parse(err.response.text).code === "ResourceNotFound"
            ) {
              this.errorMessages.push({
                message: JSON.stringify(JSON.parse(err.response.text).message)
              });
            } else {
              this.errorMessages.push({ message: JSON.stringify(err) });
            }
            return;
          }
        );
    },
    getMosaics(address, blockHeight) {
      const endpoint = this.sharedState.activeWallet.node;
      const mosaicService = new MosaicService(
        new AccountHttp(endpoint),
        new MosaicHttp(endpoint)
      );

      mosaicService
        .mosaicsAmountViewFromAddress(address)
        .pipe(
          flatMap(x => x),
          map(x => {
            const expiration =
              x.mosaicInfo.height.compact() +
              x.mosaicInfo.duration.compact() -
              blockHeight;
            return {
              title: x.mosaicInfo.mosaicId.toHex(),
              subTitle: `Balance:${x.amount
                .compact()
                .toLocaleString()}(${x.relativeAmount().toString(10)})`,
              subSubTitle: `${this.expirationText(expiration)}`,
              subSubSubTitle: `Divisibility:${
                x.mosaicInfo.divisibility
              } Supply:${x.mosaicInfo.supply.compact().toLocaleString()}`,
              subSubSubSubTitle: `SupplyMutable:${x.mosaicInfo.isSupplyMutable()} Transferable:${x.mosaicInfo.isTransferable()}`,
              owner: new Address(x.mosaicInfo.owner.address.address).pretty(),
              expand: {
                isExpandMore: false
              }
            };
          }),
          toArray()
        )
        .subscribe(x => {
          this.assets = x.length !== 0 ? x : [];
          this.loading = false;
        });
    },
    expirationText(expiration) {
      const expired = expiration < 0 ? true : false;
      switch (expired) {
        case true:
          return `Expired for ${-expiration} blocks`;
        default:
          return `Expires in ${expiration} blocks`;
      }
    },
    clearError() {
      (this.error = false), (this.errorMessages.length = 0);
    }
  }
};
</script>

<style scoped>
</style>
