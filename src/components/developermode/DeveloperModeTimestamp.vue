<template>
  <v-card>
    <v-card-title>
      <span class="title">
        Timestamp Tool
      </span>
    </v-card-title>
    <v-card-text>
      <v-flex x12>
        <span class="subheading">
          NEM2 time
        </span>
        <v-text-field
          v-model="timestampUint64"
          label="Timestamp array"
          @change="toTimestamp"
        />
        <v-text-field
          v-model="timestampDate"
          type="number"
          label="Unix Time"
          @change="fromTimestamp"
        />
        <v-text-field
          v-model="timestampUTC"
          :disabled="true"
          label="UTC"
        />
        <v-text-field
          v-model="timestampLocal"
          :disabled="true"
          label="Local"
        />
      </v-flex>
    </v-card-text>
  </v-card>
</template>
<script>
import { UInt64 } from 'nem2-sdk';

const nem2epochTimestamp = 1459468800000;

export default {
  data() {
    return {
      timestampDate: '',
      timestampUint64: '',
      timestampUTC: '',
      timestampLocal: '',
    };
  },
  methods: {
    toTimestamp() {
      const parsedUint64 = new UInt64(this.timestampUint64.replace(/(\[|\])/g, '').split(',').map(x => Number(x)));
      const millis = parsedUint64.compact() + nem2epochTimestamp;
      const d = new Date(0);
      d.setUTCMilliseconds(millis);
      this.timestampDate = d.getTime();
      this.timestampUTC = d.toUTCString();
      this.timestampLocal = d.toLocaleString();
    },
    fromTimestamp() {
      const d = new Date(0);
      d.setUTCMilliseconds(this.timestampDate);
      this.timestampUTC = d.toUTCString();
      this.timestampLocal = d.toLocaleString();
      const millis = d.getTime() - nem2epochTimestamp;
      this.timestampUint64 = `[${UInt64.fromUint(millis).toDTO()}]`;
    },
  },
};
</script>
