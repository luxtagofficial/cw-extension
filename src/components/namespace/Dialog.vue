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
    v-model="dialog"
    max-width="500"
  >
    <v-card>
      <v-card-title primary-title>
        <h3 class="headline mb-0">
          Send this transaction?
        </h3>
        <div>
          Are you sure you want to send the the transaction with the following details?
        </div>
      </v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="info"
          @click="dialog = false"
        >
          Cancel
        </v-btn>
        <v-btn
          color="info"
          @click="transmitTransaction"
        >
          Yes, send it!
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    isShow: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  watch: {
    isShow: {
      handler(newVal) {
        this.dialog = newVal;
      },
    },
    dialog: {
      handler(newVal) {
        if (newVal === false) {
          this.$emit('close');
        }
      },
    },
  },
  methods: {
    transmitTransaction() {
      this.$emit('transmitTransaction');
      this.dialog = false;
    },
  },
};
</script>

<style scoped>

</style>
