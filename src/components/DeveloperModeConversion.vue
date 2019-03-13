<template>
  <v-card>
    <v-card-title>
      <span class="title">
        Conversion Tools
      </span>
    </v-card-title>
    <v-card-text>
      <v-flex xs12>
        <span class="subheading">
          String
        </span>
        <v-text-field
          v-model="utf8String"
          label="UTF-8 String"
          placeholder="Just a string, a lonely string"
          @change="stringtoHex"
        />
        <v-text-field
          v-model="hexString"
          label="Hex String"
          @change="hextoString"
        />
      </v-flex>
      <v-divider />
      <v-flex xs12>
        <span class="subheading">
          Number
        </span>
        <v-text-field
          v-model="number"
          label="Number"
          type="number"
          @change="numberConvert"
        />
        <v-text-field
          v-model="hexNumber"
          label="Hex number"
          @change="hexConvert"
        />
        <v-text-field
          v-model="uint64Array"
          label="uint64 Array"
          placeholder="[00...,00...]"
          @change="uint64Convert"
        />
      </v-flex>
    </v-card-text>
  </v-card>
</template>
<script>
import { convert } from 'nem2-library';
import { UInt64 } from 'nem2-sdk';

export default {
  data() {
    return {
      utf8String: '',
      hexString: '',
      number: '',
      hexNumber: '',
      uint64Array: '',
    };
  },
  methods: {
    stringtoHex() {
      this.hexString = convert.utf8ToHex(this.utf8String);
    },
    hextoString() {
      if (convert.isHexString(this.hexString)) {
        this.utf8String = this.hexString.split(/(.{2})/)
          .filter(O => O)
          .map(char => String.fromCharCode(parseInt(char, 16)))
          .join('');
      }
    },
    numberConvert() {
      this.uint64Array = `[${UInt64.fromUint(Number(this.number)).toDTO()}]`;
      this.hexNumber = parseInt(this.number, 10).toString(16);
    },
    hexConvert() {
      this.number = parseInt(this.hexNumber, 16);
      this.uint64Array = `[${UInt64.fromHex(this.hexNumber).toDTO()}]`;
    },
    uint64Convert() {
      const parsedUint64 = new UInt64(this.uint64Array.replace(/(\[|\])/g, '').split(',').map(x => Number(x)));
      this.hexNumber = parsedUint64.toHex();
      this.number = parseInt(this.hexNumber, 16);
    },
  },
};
</script>
