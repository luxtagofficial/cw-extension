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
// along with nem2-wallet-browserextension.  If not, see <http://www.gnu.org/licenses/>.

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
            required
          />
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
            solo
          />
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
            required
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
  NetworkType, RegisterNamespaceTransaction, NamespaceType, Deadline, UInt64,
} from 'nem2-sdk';
import Confirmation from '../Confirmation.vue';
import SendConfirmation from './SendConfirmation.vue';

export default {
  components: {
    Confirmation,
    SendConfirmation,
  },
  data() {
    return {
      namespaceType: NamespaceType.RootNamespace,
      namespaceTypes: [
        { type: NamespaceType.RootNamespace, label: 'RootNamespace' },
        { type: NamespaceType.SubNamespace, label: 'SubNamespace' },
      ],
      namespaceName: '',
      parentNamespaceName: '',
      duration: 0,
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
      if (this.namespaceType === NamespaceType.RootNamespace) {
        return this.namespaceName === '' || this.duration === 0;
      }
      return this.namespaceName === '' || this.parentNamespaceName === '';
    },
  },
  methods: {
    showDialog() {
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
      this.transactions = [registerNamespaceTransaction];
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
