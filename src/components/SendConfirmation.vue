<template>
   <v-card v-if="txHash != '' && txRecipient != ''">
     <v-card-title><b>Transaction sent to {{ txRecipient }} was a success! 🚀</b></v-card-title>
        <v-card-text>
        Hash: <a :href="nodeURL + '/transaction/' + txHash + '/status'" target="_blank">{{ txHash }}</a> 
        </v-card-text>
      </v-card>
</template>


<script>
export default {
    props: {
        txHash: "",
        txRecipient: "",
        nodeURL: ""
    }
};
</script>
<style scoped>
</style>