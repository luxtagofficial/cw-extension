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
  <v-layout
    xs12
    column
    class="info-card"
  >
    <v-flex xs12>
      <v-card elevation="0">
        <v-card-title class="monospaced">
          <div>
            <span class="monospaced bold">Raw URI Data:</span>
            {{ uri.data }}
          </div>

          <div>
            <span class="monospaced bold">Full Link:</span>
            {{ uri.build() }}
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>

import { TransactionURI } from 'nem2-uri-scheme';

export default {

  props: {
    uri: TransactionURI,
  },
};
</script>

<style scoped>
 .info-card {
     overflow: scroll;
 }
</style>
