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