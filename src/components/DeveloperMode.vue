<template>
  <v-layout column>
    <v-flex xs12>
      <h5 class="headline">
        Developer mode
      </h5>
    </v-flex>
    <v-card>
      <v-card-title>
        <span class="title">
          Address
        </span>
      </v-card-title>
      <v-card-text>
        <v-flex xs12>
          <v-form>
            <v-text-field
              v-model="privateKey"
              label="Private Key"
              @change="recalculateAccount"
            />
            <v-text-field
              v-model="publicKey"
              label="Public Key"
              @change="recalculateAccount"
            />
            <v-radio-group
              v-model="networkID"
              row
              @change="recalculateAccount"
            >
              <v-radio
                v-for="k in networkName"
                :key="k"
                :label="`${k}`"
                :value="networkType[k]"
              />
            </v-radio-group>
            <v-text-field
              v-model="addressPlain"
              label="Address plain"
              @change="recalculateAccount"
            />
            <v-text-field
              v-model="addressPretty"
              label="Address pretty"
              @change="recalculateAccount"
            />
          </v-form>
        </v-flex>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          @click="generateAccount"
        >
          Generate private key
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>
<script>
import { Account, NetworkType } from 'nem2-sdk';

export default {
  data() {
    return {
      privateKey: '',
      publicKey: '',
      addressPlain: '',
      addressPretty: '',
      networkType: NetworkType,
      networkID: NetworkType.MIJIN_TEST,
    };
  },
  computed: {
    networkName() {
      return Object.keys(NetworkType)
        // eslint-disable-next-line no-restricted-globals
        .filter(key => !isNaN(Number(NetworkType[key])));
    },
  },
  methods: {
    recalculateAccount() {
      const pk = this.privateKey;
      if (pk.length === 64) {
        try {
          const kp = Account.createFromPrivateKey(pk, this.networkID);
          this.publicKey = kp.publicKey;
          this.addressPlain = kp.address.plain();
          this.addressPretty = kp.address.pretty();
        } catch (e) {
          console.log(e);
        }
      }
    },
    generateAccount() {
      const account = Account.generateNewAccount(NetworkType.MIJIN_TEST);
      this.privateKey = account.privateKey.toString();
      this.recalculateAccount();
    },
  },
};
</script>
<style scoped>
</style>
