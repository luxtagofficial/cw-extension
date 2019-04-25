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
  <div>
    <v-layout
      column
      xs12
    >
      <v-layout
        column
        xs12
      >
        <v-layout
          row
          mb-4
          mt-4
        >
          <v-layout
            row
            fill-height
            justify-start
            pl-3
            xs3
          >
            <h5 class="headline pt-3 pl-2">
              Transactions
            </h5>
          </v-layout>
          <v-layout
            row
            fill-height
            justify-end
            xs9
          >
            <v-btn
              color="primary mx-0"
              @click="refresh(wallet.activeWallet)"
            >
              Refresh
            </v-btn>
            <v-btn
              class="ml-3"
              color="primary mx-0"
              @click="loadMore(wallet.activeWallet)"
            >
              Load more
            </v-btn>
          </v-layout>
        </v-layout>

        <v-layout>
          <v-layout
            row
            fill-height
            justify-end
            xs9
          >
            <v-btn
              class="ml-3"
              color="primary mx-0"
              @click="$store.dispatch('application/SWOW_ADDRESS_INPUT', true)"
            >
              Lookup another address
            </v-btn>
          </v-layout>
        </v-layout>

        <v-container
          fluid
          fill-height
        >
          <v-layout child-flex>
            <v-data-table
              :headers="headers"
              :items="transactions.transactions[wallet.activeWallet.name]"
              disable-initial-sort
              :rows-per-page-items="rowsPerPageOptions"
            >
              <template v-slot:items="props">
                <tr
                  class="pointer"
                  @click="showModal(props.item.id)"
                >
                  <td class="text-xs-left">
                    <span class="clearfix">
                      <pre>{{ props.item.blockNumber.toLocaleString() }}</pre>
                    </span>
                    <span class="clearfix">
                      <pre>{{ props.item.date }}</pre>
                    </span>
                    <span class="clearfix">
                      <pre>{{ props.item.type1 }}</pre>
                    </span>
                    <span
                      v-if="props.item.type2 !== ''"
                      class="clearfix"
                    >
                      <pre>{{ props.item.type2 }}</pre>
                    </span>
                  </td>
                  <td class="text-xs-left">
                    <div
                      v-for="(mainProp, index) in props.item.mainProps"
                      :key="index"
                    >
                      <span
                        class="clearfix"
                        style="text-align:left"
                      >
                        <pre>{{ mainProp.key }}&nbsp;{{ mainProp.value }}</pre>
                      </span>
                    </div>
                  </td>
                  <td class="text-xs-left">
                    <span class="clearfix">
                      <pre>{{ props.item.signerTiny }}</pre>
                    </span>
                    <span class="clearfix">
                      <pre>{{ props.item.recipientTiny }}</pre>
                    </span>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-layout>
        </v-container>
      </v-layout>
      <div v-if="activeTransaction">
        <TransactionModal
          :modal="modal"
          :tx="activeTransaction"
          @close="modalClosed"
        />
      </div>
      <div v-if="application.showAddressInput">
        <AddressInput />
      </div>
    </v-layout>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import store from '../../store/index';
import TransactionModal from './TransactionModal.vue';
import { GET_TRANSACTIONS_MODES } from '../../infrastructure/transactions/transactions-types';
import AddressInput from '../AddressInput.vue';

export default {
  name: 'Transactions',
  store,
  components: {
    TransactionModal,
    AddressInput,
  },
  data() {
    return {
      headers: [
        { text: 'Block / Type', value: 'blockNumber' },
        { text: 'Main properties', value: '' },
        { text: 'Signer / Recipient', value: 'recipient' },
      ],
      rowsPerPageOptions: [
        25, 50, { text: 'All', value: -1 },
      ],
      modal: false,
      activeTransaction: false,
    };
  },
  computed: mapState([
    'transactions',
    'application',
    'wallet',
  ]),
  methods: {
    refresh(wallet) {
      this.$store.dispatch(
        'transactions/GET_TRANSACTIONS_BY_ID',
        { wallet, mode: GET_TRANSACTIONS_MODES.REFRESH },
      );
    },
    loadMore(wallet) {
      this.$store.dispatch(
        'transactions/GET_TRANSACTIONS_BY_ID',
        { wallet, mode: GET_TRANSACTIONS_MODES.MORE },
      );
    },
    showModal(clickedTx) {
      this.activeTransaction = this.transactions.transactions[this.wallet.activeWallet.name]
        .find(t => t.id === clickedTx);
      this.modal = true;
    },
    modalClosed() {
      this.modal = false;
    },
  },
};
</script>

<style scoped>
</style>
