<template>
  <v-dialog
    :value="value"
    max-width="500"
    @input="toggleDialog"
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
        <slot />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="secondary"
          @click="toggleDialog"
        >
          Cancel
        </v-btn>
        <v-btn
          color="info"
          @click="signAndAnnounce"
        >
          Yes, send it!
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  TransactionHttp,
} from 'nem2-sdk';
import StateRepository from '../infrastructure/StateRepository.js';

export default {
  name: 'Confirmation',
  props: {
    transaction: {
      type: Object,
      default() {
        return {};
      },
    },
    value: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      sharedState: StateRepository.state,
    };
  },
  computed: {
    activeWallet() {
      return this.sharedState.activeWallet;
    },
  },
  watch: {
  },
  methods: {
    toggleDialog() {
      this.$emit('input', !this.value);
    },
    signAndAnnounce() {
      if (this.activeWallet == null) return;
      const { account } = this.activeWallet;
      const endpoint = this.activeWallet.node;
      const signedTx = account.sign(this.transaction);
      const txHttp = new TransactionHttp(endpoint);
      txHttp.announce(signedTx).subscribe((x) => {
        this.$emit('sent', {
          message: x,
          txHash: signedTx.hash,
          nodeURL: endpoint,
        });
        this.toggleDialog();
      }, (e) => {
        this.$emit('error', {
          message: e,
          txHash: signedTx.hash,
          nodeURL: endpoint,
        });
        this.toggleDialog();
      });
    },
  },
};
</script>

<style scoped>

</style>
