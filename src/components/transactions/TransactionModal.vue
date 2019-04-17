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
  <v-dialog
    v-model="modal"
    max-width="600px"
  >
    <v-layout>
      <v-flex
        xs12
      >
        <v-card>
          <v-card-title primary-title>
            <div class="monospaced">
              <h3 class="headline mb-0">
                {{ tx.type2 }} {{ tx.type1 }}
              </h3>

              <span class="clearfix bold">
                ID
              </span>
              <span class="clearfix  mb-2">
                {{ tx.id }}
              </span>

              <span class="clearfix bold">
                blockNumber
              </span>
              <span class="clearfix  mb-2">
                {{ tx.blockNumber.toLocaleString() }}
              </span>

              <span class="clearfix bold">
                transactionHash
              </span>
              <span class="clearfix  mb-2">
                {{ tx.transactionHash }}
              </span>

              <span class="clearfix bold">
                signer
              </span>
              <span class="clearfix  mb-2">
                {{ tx.signer }}
              </span>

              <div v-if="tx.recipient !== ''">
                <span class="clearfix bold">
                  recipient
                </span>
                <span class="clearfix  mb-2">
                  {{ tx.recipient }}
                </span>
              </div>

              <div v-if="tx.amount > 0">
                <span class="clearfix bold">
                  amount
                </span>
                <span class="clearfix  mb-2">
                  {{ tx.amount.toLocaleString() }}
                </span>
              </div>

              <span class="clearfix bold">
                fee
              </span>
              <span class="clearfix  mb-2">
                {{ tx.fee }}
              </span>

              <div
                v-for="(bodyItem, index) in tx.body"
                :key="index"
              >
                <span class="clearfix bold">
                  {{ bodyItem.key }}
                </span>
                <span class="clearfix  mb-2">
                  {{ bodyItem.value }}
                </span>
              </div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-dialog>
</template>

<script>

export default {
  name: 'TransactionModal',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    tx: {
      type: Object,
    },
    modal: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  watch: {
    isShow: {
      handler(newVal) {
        this.modal = newVal;
      },
    },
    modal: {
      handler(newVal) {
        if (newVal === false) {
          this.$emit('close');
        }
      },
    },
  },
};
</script>

<style scoped>
</style>
