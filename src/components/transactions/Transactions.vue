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
    <div>Blank</div>
  </v-layout>
</template>
<script>
export default {
  name: "Transactions",
  components: {},
  data() {
    return {};
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