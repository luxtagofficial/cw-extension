<template>
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
        <h5 class="headline pt-3">
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
          @click="reloadList"
        >
          Reload Transactions
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
        >
          <template v-slot:items="props">
            <td class="text-xs-right">
              <span class="clearfix">
                <pre>{{ props.item.time }}</pre>
              </span>
              <span class="clearfix">
                <pre>{{ props.item.blockNumber }}</pre>
              </span>
            </td>
            <td class="text-xs-right">
              <span class="clearfix">
                <pre>{{ props.item.signer }}</pre>
              </span>
              <span class="clearfix">
                <pre>{{ props.item.recipient }}</pre>
              </span>
            </td>
            <td class="text-xs-right">
              <span class="clearfix">
                <pre>{{ props.item.amount }} ({{ props.item.fee }})</pre>
              </span>
              <span class="clearfix">
                <pre>{{ props.item.assetId }}</pre>
              </span>
            </td>
            <td class="text-xs-right">
              {{ props.item.type }}
            </td>
          </template>
        </v-data-table>
      </v-layout>
    </v-container>
  </v-layout>
</template>
<script>
import StateRepository from '../../infrastructure/StateRepository';

export default {
  name: 'Transactions',
  components: {},
  props: {
    transactions: {
      default() {
        return []
      },
      type: Array,
    },
  },
  data() {
    return {
      headers: [
        { text: 'Time / Block', value: 'blockNumber' },
        { text: 'Signer / Recipient', value: 'recipient' },
        { text: 'Amount (Fee) / Asset', value: 'amount' },
        { text: 'Type', value: 'assetId' },
      ],
      tx: this.transactions,
    };
  },
  methods: {
    reloadList(e) {
      StateRepository.getAccountTransactionsById();
    },
  },
};
</script>
<style scoped>
</style>
