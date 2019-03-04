<template>
   <v-app>
      <v-content>
        <v-container flud>
          <h4>Catapult Wallet 0.0.1</h4>
           <wallet-creation></wallet-creation>
        </v-container>
      </v-content>
    </v-app>
</template>
<script>
import WalletCreation from './WalletCreation.vue';

export default { 
  components: {
    WalletCreation
  }
};
</script>
