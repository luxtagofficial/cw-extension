<template>
  <v-dialog
    :value="value"
    :max-width="maxWidth"
    @input="toggleDialog"
  >
    <v-card>
      <v-card-title primary-title>
        <h3 class="headline mb-0">
          {{ title }}
        </h3>
        <div>
          {{ body }}
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
  TransactionHttp, Listener, TransactionType,
} from 'nem2-sdk';
import {
  filter, timeout,
} from 'rxjs/operators';
import StateRepository from '../infrastructure/StateRepository.js';

function signTransactions(transactions, account) {
  return transactions.map((tx) => {
    if (tx.type === TransactionType.LOCK) {
      return tx;
    }
    return account.sign(tx);
  }).map((tx, index, txs) => {
    if (tx.type === TransactionType.LOCK) {
      const txWithHash = tx;
      txWithHash.hash = txs[index + 1].hash;
      return account.sign(txWithHash);
    }
    return tx;
  });
}

function sendSequential(transactions, endpoint, address, emitter) {
  const wsEndpoint = endpoint.replace('http', 'ws');
  const listener = new Listener(wsEndpoint, WebSocket);
  const txHttp = new TransactionHttp(endpoint);
  listener.open().then(() => {
    const subscription = listener.confirmed(address).pipe(
      filter(transaction => transaction.transactionInfo !== undefined),
      timeout(transactions.length * 60000),
    ).subscribe((transaction) => {
      const confirmedHash = transaction.transactionInfo.hash;
      const confirmedTxIndex = transactions.findIndex(tx => tx.hash === confirmedHash);
      if (confirmedTxIndex === -1) return;
      if (transactions[confirmedTxIndex + 1] !== undefined) {
        const signedTx = transactions[confirmedTxIndex + 1];
        txHttp.announce(signedTx).subscribe((x) => {
          emitter('sent', {
            message: x,
            txHash: signedTx.hash,
            nodeURL: endpoint,
          });
        }, (e) => {
          emitter('error', {
            message: e,
            txHash: signedTx.hash,
            nodeURL: endpoint,
          });
        });
      } else {
        console.log('connection close');
        subscription.unsubscribe();
        listener.close();
      }
    }, (error) => {
      console.error(error);
      console.log('connection close');
      listener.close();
    });
    const firstSignedTx = transactions[0];
    txHttp.announce(firstSignedTx).subscribe((x) => {
      emitter('sent', {
        message: x,
        txHash: firstSignedTx.hash,
        nodeURL: endpoint,
      });
    }, (e) => {
      emitter('error', {
        message: e,
        txHash: firstSignedTx.hash,
        nodeURL: endpoint,
      });
    });
  });
}

export default {
  name: 'Confirmation',
  props: {
    value: {
      type: Boolean,
      default() {
        return false;
      },
    },
    transactions: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: String,
      default() {
        return 'Send this transaction?';
      },
    },
    body: {
      type: String,
      default() {
        return 'Are you sure you want to send the the transaction with the following details?';
      },
    },
    maxWidth: {
      type: Number,
      default() {
        return 500;
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
      const endpoint = this.activeWallet.node;
      const { account } = this.activeWallet;
      const { address } = account;
      const transactions = signTransactions(this.transactions, account);
      const emitter = (type, value) => {
        this.$emit(type, value);
      };
      sendSequential(transactions, endpoint, address, emitter);
      this.toggleDialog();
    },
  },
};
</script>

<style scoped>

</style>
