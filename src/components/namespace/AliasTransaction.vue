<template>
  <v-scale-transition>
    <v-layout column>
      <v-layout
        row
        justify-between
      >
        <v-flex xs3>
          <v-subheader>Alias</v-subheader>
        </v-flex>
        <v-flex xs7>
          <v-text-field
            v-if="!currentAlias"
            v-model="aliasInput"
            class="ma-0 pa-0"
            label="Alias (MosaicId / Address)"
            solo
            required
          />
          <v-subheader v-if="currentAlias">
            {{ currentAlias }}
          </v-subheader>
        </v-flex>
        <v-flex xs2>
          <v-btn
            :disabled="disabledSendTransaction"
            color="primary mx-0"
            @click="showDialog"
          >
            {{ !!currentAlias ? 'Unlink' : 'Link' }}
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout column>
        <SendConfirmation
          :tx-send-data="txSendResults"
        />
      </v-layout>
      <Confirmation
        v-model="isDialogShow"
        :transactions="transactions"
        @sent="txSent"
        @error="txError"
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
      </Confirmation>
    </v-layout>
  </v-scale-transition>
</template>
<script>
import {
  NetworkType, NamespaceType, Deadline,
  AliasActionType, MosaicId, NamespaceId, AddressAliasTransaction,
  MosaicAliasTransaction, AliasType,
  Address,
} from 'nem2-sdk';
import Confirmation from '../Confirmation.vue';
import SendConfirmation from './SendConfirmation.vue';

function mosaicOrAddress(input) {
  if (input.length === 16) {
    return 'mosaic';
  }
  return 'address';
}

export default {
  components: {
    Confirmation,
    SendConfirmation,
  },
  props: {
    aliasActionType: {
      type: Number,
      default: AliasActionType.Unlink,
    },
    currentAlias: {
      type: String,
      default: '',
    },
    currentAliasType: {
      type: Number,
      default: AliasType.None,
    },
    namespaceName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      aliasInput: '',
      transactions: [],
      isDialogShow: false,
      dialogDetails: [],
      txSendResults: [],
    };
  },
  computed: {
    isSubNamespace() {
      return this.namespaceType === NamespaceType.SubNamespace;
    },
    disabledSendTransaction() {
      if (this.currentAlias) {
        return false;
      }
      return !this.aliasInput;
    },
  },
  methods: {
    showDialog() {
      const {
        namespaceName, currentAlias, currentAliasType, aliasActionType, aliasInput,
      } = this;
      let transaction;
      if (aliasActionType === AliasActionType.Link) {
        const input = mosaicOrAddress(aliasInput);
        if (input === 'mosaic') {
          transaction = MosaicAliasTransaction.create(
            Deadline.create(),
            aliasActionType,
            new NamespaceId(namespaceName),
            new MosaicId(aliasInput),
            NetworkType.MIJIN_TEST,
          );
        } else {
          transaction = AddressAliasTransaction.create(
            Deadline.create(),
            this.aliasActionType,
            new NamespaceId(namespaceName),
            Address.createFromRawAddress(aliasInput),
            NetworkType.MIJIN_TEST,
          );
        }
      } else if (currentAliasType === AliasType.Mosaic) {
        transaction = MosaicAliasTransaction.create(
          Deadline.create(),
          this.aliasActionType,
          new NamespaceId(namespaceName),
          new MosaicId(currentAlias),
          NetworkType.MIJIN_TEST,
        );
      } else {
        transaction = AddressAliasTransaction.create(
          Deadline.create(),
          this.aliasActionType,
          new NamespaceId(namespaceName),
          Address.createFromRawAddress(currentAlias),
          NetworkType.MIJIN_TEST,
        );
      }
      this.transactions = [transaction];
      this.dialogDetails = [
        {
          icon: 'add',
          key: 'AliasActionType',
          value: this.aliasActionType === 0 ? 'Link' : 'Unlink',
        },
        {
          icon: 'add',
          key: 'NamespaceName',
          value: this.namespaceName,
        },
        {
          icon: 'add',
          key: 'Alias',
          value: this.currentAlias ? this.currentAlias : this.aliasInput,
        },
      ];
      this.isDialogShow = true;
    },
    txSent(result) {
      this.txSendResults.push({
        txHash: result.txHash,
        nodeURL: result.nodeURL,
      });
    },
    txError(error) {
      console.error(error);
    },
  },
};
</script>
<style scoped>
</style>
