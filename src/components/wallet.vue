<template>
   <v-app>
      <v-content>
        <v-container flud>
          <h4>Catapult Wallet 0.0.1</h4>
          <router-view></router-view>
          <router-link to="/create-wallet">Go to Wallet Creation</router-link>
        </v-container>
      </v-content>
    </v-app>
</template>
<script>

export default { 
};
</script>
