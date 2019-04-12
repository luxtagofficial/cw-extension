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
