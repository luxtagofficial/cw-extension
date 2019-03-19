<template>
  <v-card>
    <v-card-title>
      <span class="title">
        Namespace Tools
      </span>
    </v-card-title>
    <v-card-text>
      <v-flex xs12>
        <span class="subheading">
          Namespace Id
        </span>
        <v-text-field
          v-model="namespaceString"
          label="Namespace name"
          placeholder="nem.xem"
          :error="namespaceErr"
          :error-messages="namespaceErrMessage"
          @change="namespaceGenerator"
        />
        <v-text-field
          v-model="namespaceIdUint64"
          label="Namespace Id (Uint64)"
          @change="namespaceGeneratorUint64"
        />
        <v-text-field
          v-model="namespaceIdHex"
          label="Namespace Id (Hex)"
          @change="namespaceGeneratorHex"
        />
      </v-flex>
      <v-spacer />
      <v-flex xs12>
        <span class="subheading">
          Mosaic Id
        </span>
        <v-text-field
          v-model="mosaicOwner"
          label="Mosaic Owner Public Key"
          @change="mosaicGenerator"
        />
        <v-text-field
          v-model="mosaicNonce"
          label="Mosaic Nonce"
          @change="mosaicGenerator"
        />
        <v-text-field
          v-model="mosaicId"
          label="Mosaic Id"
        />
      </v-flex>
    </v-card-text>
  </v-card>
</template>
<script>
import {
  NamespaceId, Id, PublicAccount, MosaicId, MosaicNonce,
} from 'nem2-sdk';
import { convert } from 'nem2-library';

export default {
  data() {
    return {
      namespaceString: '',
      namespaceIdHex: '',
      namespaceIdUint64: '',
      namespaceErr: false,
      namespaceErrMessage: '',
      mosaicOwner: '',
      mosaicNonce: '',
      mosaicId: '',
    };
  },
  methods: {
    clearError() {
      this.namespaceErr = false;
      this.namespaceErrMessage = '';
    },
    showError(e) {
      if (e instanceof Error) {
        this.namespaceErrMessage = `${e.name}: ${e.message}`;
      } else {
        this.namespaceErrMessage = e;
      }
    },
    namespaceGenerator() {
      this.clearError();
      if (this.namespaceString.length === 0) {
        this.namespaceIdUint64 = '';
        this.namespaceIdHex = '';
        return;
      }
      try {
        const namespace = new NamespaceId(this.namespaceString);
        this.namespaceIdHex = namespace.toHex().toUpperCase();
        this.namespaceIdUint64 = `[${namespace.id.toDTO()}]`;
      } catch (e) {
        this.showError(e);
      }
    },
    namespaceGeneratorUint64() {
      this.clearError();
      try {
        const parsedUint64Id = this.namespaceIdUint64.replace(/(\[|\])/g, '').split(',').map(x => Number(x));
        const namespace = new NamespaceId(parsedUint64Id);
        this.namespaceIdHex = namespace.toHex().toUpperCase();
        this.showError('Unable to calculate name from Id');
      } catch (e) {
        this.showError(e);
      }
    },
    namespaceGeneratorHex() {
      this.clearError();
      try {
        const parsedHexId = Id.fromHex(this.namespaceIdHex);
        const namespace = new NamespaceId(parsedHexId.toDTO());
        this.namespaceIdUint64 = `[${namespace.id.toDTO()}]`;
        this.showError('Unable to calculate name from Id');
      } catch (e) {
        this.showError(e);
      }
    },
    mosaicGenerator() {
      const publicAccount = PublicAccount.createFromPublicKey(this.mosaicOwner);
      // Fix endianess
      // From https://github.com/planethouki/til/blob/master/nem2-sdk-cow/helper.js
      const uint8arr = convert.hexToUint8(this.mosaicNonce);
      const fixedHex = convert.uint8ToHex(uint8arr.reverse());
      const nonce = MosaicNonce.createFromHex(fixedHex);
      this.mosaicId = MosaicId.createFromNonce(nonce, publicAccount).toHex().toUpperCase();
    },
  },
};
</script>
