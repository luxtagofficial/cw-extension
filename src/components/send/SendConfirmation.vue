<template>
<v-card v-show="txHash != ''" elevation="0" column>
    <v-layout row align-center>
        <v-flex xs12>
          <div class="title ma-3">Transaction was sent successfully! 🚀</div>
        </v-flex>
      </v-layout>
      <v-layout row align-center>
        <v-flex xs3>
          <v-subheader>Recipient</v-subheader>
        </v-flex>
        <v-flex xs9>
          <div class="monospaced">{{txRecipient}}</div>
        </v-flex>
      </v-layout>

      <v-layout row align-center>
          <v-flex xs3>
          <v-subheader>Hash</v-subheader>
          </v-flex>
          <v-flex xs9>
              <div class="monospaced">
             <a :href="`${nodeURL}/transaction/${txHash}/status`" target="_blank">{{ txHash }}</a>
             </div>
          </v-flex>
      </v-layout>
</v-card>
</template>

<script>
export default {
  props: {
    txHash: "",
    txRecipient: "",
    nodeURL: ""
  }
};
</script>
<style scoped>
</style>