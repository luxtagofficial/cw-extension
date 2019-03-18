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
          NS / Mosaic Id
        </span>
        <v-text-field
          v-model="namespaceString"
          label="NS / Mosaic name"
          placeholder="nem.xem"
          :error="namespaceErr"
          :error-messages="namespaceErrMessage"
          @change="namespaceGenerator"
        />
        <v-text-field
          v-model="namespaceIdUint64"
          label="NS / Mosaic Id (Uint64)"
          @change="namespaceGeneratorUint64"
        />
        <v-text-field
          v-model="namespaceIdHex"
          label="NS / Mosaic Id (Hex)"
          @change="namespaceGeneratorHex"
        />
      </v-flex>
    </v-card-text>
  </v-card>
</template>
<script>
import { NamespaceId, Id } from 'nem2-sdk';

export default {
  data() {
    return {
      namespaceString: '',
      namespaceIdHex: '',
      namespaceIdUint64: '',
      namespaceErr: false,
      namespaceErrMessage: '',
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
        this.namespaceIdHex = namespace.toHex();
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
        this.namespaceIdHex = namespace.toHex();
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
  },
};
</script>
