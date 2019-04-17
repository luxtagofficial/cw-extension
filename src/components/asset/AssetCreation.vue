<template>
  <v-scale-transition>
    <v-layout
      column
      class="mb-3"
    >
      <v-layout row>
        <v-flex xs12>
          <v-subheader
            class="mb-3"
          >
            <h3>Asset creation</h3>
          </v-subheader>
        </v-flex>
        <v-flex xs9 /></v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs3>
          <v-subheader>Supply (unit)</v-subheader>
        </v-flex>
        <v-flex xs9>
          <v-text-field
            v-model="supply"
            class="ma-0 pa-0"
            label="Integer in the range of 0 and 9,000,000,000"
            type="number"
            solo
            required
            number
          />
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex xs3>
          <v-subheader>Divisibility (number of decimals)</v-subheader>
        </v-flex>
        <v-flex xs9>
          <v-text-field
            v-model="divisibility"
            class="ma-0 pa-0"
            label="Integer in the range of 0 and 6"
            type="number"
            solo
            required
            number
          />
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex xs3>
          <v-subheader>Duration (blocks)</v-subheader>
        </v-flex>
        <v-flex xs9>
          <v-text-field
            v-model="duration"
            class="ma-0 pa-0"
            label="Fill 0 for unlimited duration"
            type="number"
            solo
            required
            number
          />
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex xs3>
          <v-subheader>Transferable</v-subheader>
        </v-flex>
        <v-flex xs9>
          <v-switch
            v-model="transferable"
            :label="`${transferable.toString()}`"
          />
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex xs3>
          <v-subheader>Mutable supply</v-subheader>
        </v-flex>
        <v-flex xs9>
          <v-switch
            v-model="supplyMutable"
            :label="`${supplyMutable.toString()}`"
          />
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex xs3>
          <v-subheader>Mutable levy</v-subheader>
        </v-flex>
        <v-flex xs9>
          <v-switch
            v-model="levyMutable"
            :label="`${levyMutable.toString()}`"
          />
        </v-flex>
      </v-layout>
      <v-layout column>
        <SendConfirmation
          :tx-send-data="txSendResults"
        />
      </v-layout>
      <v-layout
        row
        justify-end
        align-center
      >
        <v-btn
          flat
          @click="$emit('closeComponent')"
        >
          Close
        </v-btn>
        <v-btn
          :disabled="disabledSendTransaction"
          color="primary mx-0"
          @click="showDialog"
        >
          Send Transaction
        </v-btn>
      </v-layout>
      <Dialog
        :is-show="isDialogShow"
        @transmitTransaction="createAsset"
        @close="dialogClosed"
      >
        <v-list>
          <v-list-tile
            v-for="detail in dialogDetails"
            :key="detail.key"
          >
            <v-list-tile-action>
              <v-icon>{{ detail.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ detail.key }}: {{ detail.value }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </Dialog>
    </v-layout>
  </v-scale-transition>
</template>

<script>
import {
  AggregateTransaction,
  Deadline,
  MosaicId,
  MosaicDefinitionTransaction,
  MosaicProperties,
  MosaicSupplyChangeTransaction,
  MosaicSupplyType,
  MosaicNonce,
  NetworkType,
  TransactionHttp,
  UInt64,
} from 'nem2-sdk';
import StateRespository from '../../infrastructure/StateRepository';
import Dialog from './Dialog.vue';
import SendConfirmation from './SendConfirmation.vue';

export default {
  name: 'AssetCreation',
  components: {
    Dialog,
    SendConfirmation,
  },
  data() {
    return {
      sharedState: StateRespository.state,
      supply: 1,
      divisibility: 0,
      duration: 0,
      supplyMutable: false,
      transferable: false,
      levyMutable: false,
      isDialogShow: false,
      dialogDetails: [],
      txSendResults: [],
      disabledSendTransaction: false,
    };
  },
  watch: {
    transferable: {
      handler(e) {
        this.disabledSendTransaction = !(typeof e === 'boolean');
      },
    },
    supplyMutable: {
      handler(e) {
        this.disabledSendTransaction = !(typeof e === 'boolean');
      },
    },
    levyMutable: {
      handler(e) {
        this.disabledSendTransaction = !(typeof e === 'boolean');
      },
    },
    divisibility: {
      handler(e) {
        this.disabledSendTransaction = !(parseInt(e, 10) >= 0 && parseInt(e, 10) <= 6);
      },
    },
    supply: {
      handler(e) {
        this.disabledSendTransaction = !(parseInt(e, 10) > 0 && parseInt(e, 10) <= 9000000000);
      },
    },
    duration: {
      handler(e) {
        this.disabledSendTransaction = !(parseInt(e, 10) >= 0);
      },
    },
  },
  methods: {
    showDialog() {
      this.dialogDetails = [
        {
          icon: 'add',
          key: 'Supply',
          value: this.supply,
        },
        {
          icon: 'add',
          key: 'Divisibility',
          value: this.divisibility,
        },
        {
          icon: 'add',
          key: 'Duration (blocks)',
          value: this.duration === 0 ? 'unlimited' : this.duration,
        },
        {
          icon: 'add',
          key: 'Mutable supply',
          value: this.supplyMutable,
        },
        {
          icon: 'add',
          key: 'Mutable levy',
          value: this.levyMutable,
        },
        {
          icon: 'add',
          key: 'Transferable',
          value: this.transferable,
        },
      ];
      this.isDialogShow = true;
    },
    createAsset() {
      if (!this.sharedState.activeWallet) return;
      const endpoint = this.sharedState.activeWallet.node;
      const transactionHttp = new TransactionHttp(endpoint);
      // eslint-disable-next-line prefer-destructuring;
      const { account } = this.sharedState.activeWallet;
      const nonce = MosaicNonce.createRandom();

      const mosaicDefinitionTransaction = MosaicDefinitionTransaction.create(
        Deadline.create(),
        nonce,
        MosaicId.createFromNonce(nonce, account.publicAccount),
        MosaicProperties.create({
          supplyMutable: this.supplyMutable,
          transferable: this.transferable,
          levyMutable: this.levyMutable,
          divisibility: parseInt(this.divisibility, 10),
          duration: this.duration === 0
            ? undefined
            : UInt64.fromUint(parseInt(this.duration, 10)),
        }),
        NetworkType.MIJIN_TEST,
      );

      const mosaicSupplyChangeTransaction = MosaicSupplyChangeTransaction.create(
        Deadline.create(),
        mosaicDefinitionTransaction.mosaicId,
        MosaicSupplyType.Increase,
        UInt64.fromUint(parseInt(this.supply, 10)),
        NetworkType.MIJIN_TEST,
      );

      const aggregateTransaction = AggregateTransaction.createComplete(
        Deadline.create(),
        [
          mosaicDefinitionTransaction.toAggregate(account.publicAccount),
          mosaicSupplyChangeTransaction.toAggregate(account.publicAccount),
        ],
        NetworkType.MIJIN_TEST,
        [],
      );

      const signedTx = account.sign(aggregateTransaction);

      transactionHttp
        .announce(signedTx)
        // eslint-disable-next-line no-console
        .subscribe(x => console.log(x), err => console.error(err));

      this.txSendResults = [{
        txHash: signedTx.hash,
        nodeURL: endpoint,
      }];
    },
    dialogClosed() {
      this.isDialogShow = false;
      this.dialogDetails = [];
    },
  },

};

</script>

<style scoped>
</style>
