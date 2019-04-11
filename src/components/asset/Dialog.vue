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
        <slot />
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
