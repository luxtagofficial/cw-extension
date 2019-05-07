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
  <v-dialog
    v-model="show"
    max-width="515"
  >
    <v-card>
      <v-card-title primary-title>
        <h3 class="headline mb-3">
          Transactions filters
        </h3>
      </v-card-title>
      <v-card-text>
        <div
          v-for="(val, prop) in transactions.transactionTypesFilters"
          :key="prop"
        >
          <v-switch
            v-model="transactions.transactionTypesFilters[prop]"
            :label="prop.replace(/_/g, ' ').replace(/8/g, '.')"
            @click.stop="updateTxFilterProp(prop)"
          />
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="info"
          @click.stop="show=false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import store from '../../store/index';

export default {
  name: 'TransactionListFilters',
  store,
  props: {
    visible: Boolean,
  },
  computed: {
    ...mapState([
      'transactions',
      'application',
    ]),
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit('close');
        }
      },
    },
  },
  methods: {
    updateTxFilterProp(prop) {
      this.$store.dispatch(
        'transactions/UPDATE_TRANSACTION_TYPES_FILTERS', prop,
      );
    },
  },
};
</script>
