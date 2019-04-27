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
    <WoWalletCreation />
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import { Address } from 'nem2-sdk';
import store from '../../store/index';
import WoWalletCreation from './WoWalletCreation.vue';

export default {
  name: 'WoWalletCreationDialog',
  store,
  components: {
    WoWalletCreation,
  },
  props: {
    visible: Boolean,
  },
  data() {
    return {
      address: '',
      validAddress: false,
      name: '',
      node: this.$store.getters['wallet/GET_ACTIVE_WALLET'].node,
      disabledValidation: true,
      isToBeSaved: true,
    };
  },
  computed: {
    ...mapState([
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
  watch: {
    address: {
      handler(e) {
        try {
          const address = Address.createFromRawAddress(e);
          this.validAddress = address;
          this.disabledValidation = false;
        } catch (error) {
          this.validAddress = false;
          this.disabledValidation = true;
        }
      },
    },
    name: {
      handler(e) {
        this.disabledValidation = !(typeof e === 'string');
      },
    },
    node: {
      handler(e) {
        this.disabledValidation = !(typeof e === 'string');
      },
    },
    isToBeSaved: {
      handler(e) {
        this.disabledValidation = !(typeof e === 'boolean');
      },
    },
  },
  methods: {
    validateAddress() {
      if (this.disabledValidation || !this.validAddress) return;
      this.$store.dispatch('wallet/ADD_WATCH_ONLY_WALLET',
        {
          address: this.validAddress,
          name: this.name === '' ? this.validAddress.pretty() : this.name,
          node: this.node,
          isToBeSaved: this.isToBeSaved,
        });
      this.$emit('close');
    },
  },
};
</script>
