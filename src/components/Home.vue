<template>
  <v-layout column>
    <h5 class="headline">Information</h5>
    <p
      class="monospaced"
      v-if="sharedState.activeWallet"
    >Active Wallet Address: {{sharedState.activeWallet.account.address.pretty()}}</p>
    {{accountInfo}}
  </v-layout>
</template>
<script>
import { AccountHttp, Address } from "nem2-sdk";
import StateRepository from "../infrastructure/StateRepository.js";

export default {
  data() {
    return { sharedState: StateRepository.state, accountInfo: {} };
  },
  created() {
    console.log("activated");
    const activeWallet = this.sharedState.activeWallet;
    const accountHttp = new AccountHttp(activeWallet.node);
    const address = Address.createFromRawAddress(
      activeWallet.account.address.pretty()
    );
    accountHttp.getAccountInfo(address).subscribe(
      accountInfo => {
        console.log("accountInfo", accountInfo);
        this.accountInfo = accountInfo;
        console.log(this.accountInfo);
      },
      err => console.error(err)
    );
  }
};
</script>
<style scoped>
</style>
