<template>
  <v-scale-transition>
    <v-layout column>
      <v-layout row>
        <v-flex xs3>
          <v-subheader>Namespace Type</v-subheader>
        </v-flex>
        <v-flex xs9>
          <v-radio-group
            v-model="namespaceType"
            row
          >
            <v-radio
              v-for="t in namespaceTypes"
              :key="t.type"
              :label="t.label"
              :value="t.type"
            />
          </v-radio-group>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs3>
          <v-subheader>Namespace name</v-subheader>
        </v-flex>
        <v-flex xs9>
          <v-text-field
            v-model="namespaceName"
            class="ma-0 pa-0"
            label="Namespace name"
            solo
            required></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout
        v-if="isSubNamespace"
        row
      >
        <v-flex xs3>
          <v-subheader>Parent Namespace name</v-subheader>
        </v-flex>
        <v-flex xs9>
          <v-text-field
            v-model="parentNamespaceName"
            class="ma-0 pa-0"
            label="Parent Namespace name"
            solo></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout
        v-if="!isSubNamespace"
        row
      >
        <v-flex xs3>
          <v-subheader>Duration</v-subheader>
        </v-flex>
        <v-flex xs9>
          <v-text-field
            v-model="duration"
            class="ma-0 pa-0"
            label="Duration"
            type="number"
            solo
            required></v-text-field>
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
        @transmitTransaction="sendTransaction"
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
  NetworkType, RegisterNamespaceTransaction, NamespaceType, Deadline, UInt64, TransactionHttp,
} from 'nem2-sdk';
import StateRepository from '../../infrastructure/StateRepository.js';
import Dialog from './Dialog.vue';
import SendConfirmation from './SendConfirmation.vue';

export default {
  components: {
    Dialog,
    SendConfirmation,
  },
  data() {
    return {
      sharedState: StateRepository.state,
      namespaceType: NamespaceType.RootNamespace,
      namespaceTypes: [
        { type: NamespaceType.RootNamespace, label: 'RootNamespace' },
        { type: NamespaceType.SubNamespace, label: 'SubNamespace' },
      ],
      namespaceName: '',
      parentNamespaceName: '',
      duration: 0,
      isDialogShow: false,
      dialogDetails: [],
      txSendResults: [],
    };
  },
  computed: {
    activeWallet() {
      return this.sharedState.activeWallet;
    },
    isSubNamespace() {
      return this.namespaceType === NamespaceType.SubNamespace;
    },
    disabledSendTransaction() {
      if (this.namespaceType === NamespaceType.RootNamespace) {
        return this.namespaceName === '' || this.duration === 0;
      }
      return this.namespaceName === '' || this.parentNamespaceName === '';
    },
  },
  methods: {
    showDialog() {
      this.dialogDetails = [
        {
          icon: 'add',
          key: 'NamespaceType',
          value: this.namespaceType === 0 ? 'RootNamespace' : 'SubNamespace',
        },
        {
          icon: 'add',
          key: 'Namespace name',
          value: this.namespaceType === 0 ? this.namespaceName : (`${this.parentNamespaceName}.${this.namespaceName}`),
        },
        {
          icon: 'add',
          key: 'Duration',
          value: this.duration,
        },
      ];
      this.isDialogShow = true;
    },
    sendTransaction() {
      if (this.activeWallet == null) return;
      const { duration } = this;
      const { namespaceName, parentNamespaceName } = this;
      let registerNamespaceTransaction;
      switch (this.namespaceType) {
        case NamespaceType.RootNamespace:
          registerNamespaceTransaction = RegisterNamespaceTransaction.createRootNamespace(
            Deadline.create(),
            namespaceName,
            UInt64.fromUint(duration),
            NetworkType.MIJIN_TEST,
          );
          break;
        case NamespaceType.SubNamespace:
          registerNamespaceTransaction = RegisterNamespaceTransaction.createSubNamespace(
            Deadline.create(),
            namespaceName,
            parentNamespaceName,
            NetworkType.MIJIN_TEST,
          );
          break;
        default:
          return;
      }
      const { account } = this.activeWallet;
      const endpoint = this.activeWallet.node;
      const signedTx = account.sign(registerNamespaceTransaction);
      const txHttp = new TransactionHttp(endpoint);
      txHttp.announce(signedTx).subscribe(console.log, console.error);
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
