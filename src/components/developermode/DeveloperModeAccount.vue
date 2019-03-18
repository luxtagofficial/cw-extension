<template>
  <v-card>
    <v-card-title>
      <span class="title">
        Account Tools
      </span>
    </v-card-title>
    <v-card-text>
      <v-flex xs12>
        <v-form>
          <v-text-field
            v-model="privateKey"
            label="Private Key"
            :error="privateKeyErr"
            :messages="privateKeyErrMessage"
            @change="recalculateAccount"
          />
          <v-text-field
            v-model="publicKey"
            label="Public Key"
            @change="recalculatePublicAccount"
          />
          <v-radio-group
            v-model="networkID"
            row
            @change="recalculatePublicAccount"
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
          />
          <v-text-field
            v-model="addressPretty"
            label="Address pretty"
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
</template>

<script>
import { Account, NetworkType, PublicAccount } from 'nem2-sdk';

export default {
  data() {
    return {
      privateKey: '',
      publicKey: '',
      addressPlain: '',
      addressPretty: '',
      publicAccount: null,
      networkType: NetworkType,
      networkID: NetworkType.MIJIN_TEST,
      privateKeyErr: false,
      privateKeyErrMessage: '',
    };
  },
  computed: {
    networkName() {
      // Hide MAIN_NET and TEST_NET until catapult release
      // return Object.keys(NetworkType)
      //   // eslint-disable-next-line no-restricted-globals
      //   .filter(key => !isNaN(Number(NetworkType[key])));
      return ['MIJIN', 'MIJIN_TEST'];
    },
  },
  methods: {
    isPrivatePublicKeyMatch() {
      const acc = Account.createFromPrivateKey(this.privateKey, this.networkID);
      return acc.publicKey.toUpperCase() === this.publicKey.toUpperCase();
    },
    checkPrivatePublicKeyMatch() {
      if (!this.isPrivatePublicKeyMatch()) {
        this.privateKeyErr = true;
        this.privateKeyErrMessage = 'Private Key does not match public key';
        return;
      }
      this.privateKeyErr = false;
      this.privateKeyErrMessage = '';
    },
    recalculateAccount() {
      const pp = this.privateKey;
      if (pp.length === 64) {
        try {
          const acc = Account.createFromPrivateKey(pp, this.networkID);
          this.publicKey = acc.publicKey;
          this.recalculatePublicAccount();
        } catch (e) {
          console.error(e);
        }
      }
    },
    recalculatePublicAccount() {
      const pk = this.publicKey;
      if (pk.length === 64) {
        try {
          this.publicAccount = PublicAccount.createFromPublicKey(pk, this.networkID);
          this.updateAddress();
        } catch (e) {
          console.error(e);
        }
      }
      this.checkPrivatePublicKeyMatch();
    },
    updateAddress() {
      const acc = this.publicAccount;
      this.addressPlain = acc.address.plain();
      this.addressPretty = acc.address.pretty();
    },
    generateAccount() {
      const account = Account.generateNewAccount(this.networkID);
      this.privateKey = account.privateKey.toString();
      this.recalculateAccount();
    },
  },
};
</script>
