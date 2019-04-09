<template>
  <v-layout column xs12>
    <v-layout row mb-4 mt-4>
      <v-layout row fill-height justify-start pl-3 xs3>
        <h5 class="headline pt-3">Transactions</h5>
      </v-layout>
      <v-layout row fill-height justify-end xs9>
        <v-btn color="primary mx-0" @click="reloadList">Reload Transactions</v-btn>
      </v-layout>
    </v-layout>
    <v-data-table :headers="headers" :items="tx" class="elevation-1">
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
            <pre>{{ props.item.from }}</pre>
          </span>
          <span class="clearfix">
            <pre>{{ props.item.to }}</pre>
          </span>
        </td>
        <td class="text-xs-right">
          <span class="clearfix">
            <pre>{{ props.item.amount }}</pre>
          </span>
          <span class="clearfix">
            <pre>({{ props.item.fee }})</pre>
          </span>
        </td>
        <td class="text-xs-right">{{ props.item.type }}</td>
      </template>
    </v-data-table>
  </v-layout>
</template>
<script>
export default {
  name: "Transactions",
  components: {},
  data() {
    return {
      headers: [
        { text: "Time / Block", value: "time" },
        { text: "Sender / Recipient", value: "from" },
        { text: "Amount / (Fee)", value: "amount" },
        { text: "Type", value: "asset" }
      ],
      tx: [
        {
          time: "2019-07-04 15:10",
          from: "SD4GWL-PNPHVJ-MCV3ZL-2BXGNV-RT6XMG-YMP6KW-I5JB",
          to: "SD4GWL-PNPHVJ-MCV3ZL-2BXGNV-RT6XMG-YMP6KW-I5JB",
          amount: "133546354",
          fee: "12",
          asset: "assetname",
          blockNumber: 123456789,
          type: "Transfer"
        }
      ]
    };
  },
  props: {
    sharedState: {
      type: Object
    }
  },
  methods: {
    reloadList: function(e) {
      StateRepository.loadMosaics();
    }
  }
};
</script>
<style scoped>
</style>