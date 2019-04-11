<template>
  <v-list
    two-line
    class="py-0"
  >
    <v-slide-y-transition
      group
      tag="v-list"
      class="py-0"
    >
      <template v-for="(result) in results">
        <v-list-tile
          :key="result.txHash"
          avatar
          ripple
        >
          <v-list-tile-content class="my-2">
            <v-list-tile-title>Transaction sent was a success! 🚀</v-list-tile-title>
            <v-list-tile-sub-title class="monospaced-bold">
              Hash:
              <a
                :href="result.txStatusUrl"
                target="_blank"
              >
                {{ result.txHash }}
              </a>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-slide-y-transition>
  </v-list>
</template>

<script>
export default {
  props: {
    txSendData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    results() {
      return this.txSendData.map(result => ({
        txHash: result.txHash,
        txStatusUrl: `${result.nodeURL}/transaction/${result.txHash}/status`,
      }));
    },
  },
};
</script>
<style scoped>
</style>
