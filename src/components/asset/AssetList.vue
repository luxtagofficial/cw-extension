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
          <template v-for="(as, index) in assets">
            <v-layout
              :key="as.title"
              column
            >
              <v-list-tile
                avatar
                ripple
              >
                <v-list-tile-content class="my-2">
                  <v-list-tile-title>{{ as.title }}</v-list-tile-title>
                  <v-list-tile-sub-title>
                    <div class="monospaced-bold">
                      {{ as.subTitle }}
                    </div>
                  </v-list-tile-sub-title>
                  <v-list-tile-sub-title>
                    <div class="monospaced">
                      {{ as.subSubTitle }}
                    </div>
                  </v-list-tile-sub-title>
                  <v-list-tile-sub-title>
                    <div class="monospaced">
                      {{ as.subSubSubTitle }}
                    </div>
                  </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn
                    icon
                    @click="as.expand.isExpandMore = !as.expand.isExpandMore"
                  >
                    <v-icon> {{ as.expand.isExpandMore ? "expand_less" : "expand_more" }} </v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-layout>
            <v-divider
              v-if="index + 1 < assets.length"
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
  MosaicService, NetworkCurrencyMosaic,
  AccountHttp, MosaicHttp, BlockchainHttp,
} from 'nem2-sdk';
import { mergeMap } from 'rxjs/operators';
import StateRepository from '../../infrastructure/StateRepository.js';

export default {
  name: 'AssetList',
  props: {
    reloadAssetNotifier: {
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
      assets: [],
      mosaicAmountViews: [],
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
        this.reloadAssets();
      },
    },
    reloadAssetNotifier: {
      handler() {
        this.reloadAssets();
      },
    },
  },
  mounted() {
    this.reloadAssets();
  },
  methods: {
    async reloadAssets() {
      if (this.activeWallet == null) return;
      this.assets = [];
      const endpoint = this.activeWallet.node;
      const { address } = this.activeWallet.account;
      const blockChainHttp = new BlockchainHttp(endpoint);
      const blockHeight = (await blockChainHttp.getBlockchainHeight().toPromise()).compact();
      const accountHttp = new AccountHttp(endpoint);
      const mosaicHttp = new MosaicHttp(endpoint);
      const mosaicService = new MosaicService(accountHttp, mosaicHttp);
      accountHttp.getAccountInfo(address).pipe(
        mergeMap((accountInfo) => {
          const mosaics = accountInfo.mosaics.length !== 0
            ? accountInfo.mosaics : [NetworkCurrencyMosaic.createAbsolute(0)];
          return mosaicService.mosaicsAmountView(mosaics);
        }),
      ).subscribe((mosaicAmountViews) => {
        this.assets = mosaicAmountViews.filter((mosaicAmountView) => {
          if (blockHeight === 0) {
            return true;
          }
          if (mosaicAmountView.mosaicInfo.duration.compact() === 0) {
            return true;
          }
          const endHeight = mosaicAmountView.mosaicInfo.height.compact()
              + mosaicAmountView.mosaicInfo.duration.compact();
          return blockHeight < endHeight;
        }).sort((a, b) => {
          const nameA = a.mosaicInfo.metaId;
          const nameB = b.mosaicInfo.metaId;
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        }).map((mosaicAmountView) => {
          const { divisibility } = mosaicAmountView.mosaicInfo.properties;
          const amount = mosaicAmountView.amount.compact();
          const relAmount = amount / (10 ** divisibility);
          const mosaicId = mosaicAmountView.fullName().toUpperCase();
          const { mosaicInfo } = mosaicAmountView;
          const endHeight = mosaicInfo.height.compact() + mosaicInfo.duration.compact();
          return {
            title: mosaicId,
            subTitle: `Balance:${amount.toString(10)}(${relAmount.toString(10)})`,
            subSubTitle: ` Expire within ${endHeight - blockHeight} blocks`,
            subSubSubTitle: `Divisibility:${mosaicInfo.divisibility} Supply:${mosaicInfo.supply.compact()} SupplyMutable:${mosaicInfo.isSupplyMutable()} Transferable:${mosaicInfo.isTransferable()}`,
            expand: {
              isExpandMore: false,
            },
          };
        });
      });
    },
  },
};
</script>

<style scoped>

</style>
