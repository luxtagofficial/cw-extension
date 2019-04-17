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
            @click="refresh"
          >
            Refresh
          </v-btn>
          <v-btn
            class="ml-3"
            color="primary mx-0"
            @click="loadMore"
          >
            Load more
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
            :items="transactions"
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
                    <pre>{{ props.item.time }}</pre>
                  </span>
                  <span class="clearfix">
                    <pre>{{ props.item.blockNumber.toLocaleString() }}</pre>
                  </span>
                </td>
                <td class="text-xs-left">
                  <span class="clearfix">
                    <pre>{{ props.item.type1 }}</pre>
                  </span>
                  <span class="clearfix">
                    <pre>{{ props.item.type2 }}</pre>
                  </span>
                </td>
                <td class="text-xs-left">
                  <span class="clearfix">
                    <pre>{{ props.item.mainProp1 }}</pre>
                  </span>
                  <span class="clearfix">
                    <pre>{{ props.item.mainProp2 }}</pre>
                  </span>
                </td>
                <td class="text-xs-left">
                  <span class="clearfix">
                    <pre>{{ props.item.signer }}</pre>
                  </span>
                  <span class="clearfix">
                    <pre>{{ props.item.recipient }}</pre>
                  </span>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-layout>
      </v-container>
    </v-layout>

    <TransactionModal
      :modal="modal"
      :tx="activeTransaction"
      @close="modalClosed"
    />
  </v-layout>
</template>
<script>
import StateRepository from '../../infrastructure/StateRepository';
import TransactionModal from './TransactionModal.vue';

export default {
  name: 'Transactions',
  components: {
    TransactionModal,
  },
  props: {
    transactions: {
      default() {
        return [];
      },
      type: Array,
    },
  },
  data() {
    return {
      headers: [
        { text: 'Time / Block', value: 'blockNumber' },
        { text: 'Type', value: 'type1' },
        { text: 'Main properties', value: 'mainProp1' },
        { text: 'Signer / Recipient', value: 'recipient' },
      ],
      tx: this.transactions,
      rowsPerPageOptions: [
        25, 50, { text: 'All', value: -1 },
      ],
      activeTransaction: this.transactions[0],
      modal: false,
    };
  },
  computed: {

  },
  methods: {
    refresh() {
      StateRepository.getAccountTransactionsById('refresh');
    },
    loadMore() {
      StateRepository.getAccountTransactionsById('more');
    },
    showModal(clickedTx) {
      this.activeTransaction = this.transactions.find(t => t.id === clickedTx);
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
