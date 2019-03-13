<template>
  <v-layout column>
    <v-flex xs12>
      <h5 class="headline">Send a transaction</h5>
      <p>
        Current Node: 
        <a href="http://54.178.241.129:3000">http://54.178.241.129:3000</a>
        (Cow)
      </p>
    </v-flex>
    <v-flex xs12>
    <v-form>
    <v-text-field
        label="Recipient"
        placeholder="ex. SB2JNF-UZ4MQP-BBDEQ2-C4QW2U-56PPVK-KMAMDU-77IE"
        v-model="txRecipient"></v-text-field>

        <v-text-field
        label="Amount (XEM)"
        placeholder="ex. 10"
        type="number"
        v-model="txAmount"></v-text-field>

         <v-text-field
        label="Message"
        placeholder="Here is your XEM, Bob! - Alice"
        v-model="txMessage"></v-text-field>

        <v-spacer></v-spacer>

        <v-text-field
        label="Private Key"
        v-model="userPrivateKey"></v-text-field>

     <v-flex xs12 v-if="txRecipient == '' || userPrivateKey == ''">
      <v-alert :value="true" type="error">
        Please enter a recipient, amount, and your private key.
      </v-alert>
    </v-flex>

     <v-btn 
        v-on:click="dialog = true"
        :disabled="txRecipient == '' || userPrivateKey == ''"
        color="primary mx-0">Send
      </v-btn>
      </v-form>
    </v-flex>

<v-dialog
      v-model="dialog"
      max-width="500">
      <v-card>
        <v-card-title class="headline">Send this transaction?</v-card-title>
        <v-card-text>
          Are you sure you want to send the the transaction with the following details?
          <v-list>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>person_outline</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Recipient: {{ txRecipient }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon>monetization_on</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Amount: {{ txAmount }} XEM</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon>message</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Message: {{ txMessage }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="info"
            @click="dialog = false">
            Cancel
          </v-btn>

          <v-btn
            color="info"
            @click="sendTransferTransaction">
            Yes, send it!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    
    <v-card v-if="txHash != '' && txHash">
        <v-card-title><b>Transaction sent to {{ txRecipient }} was a success! 🚀</b></v-card-title>
        <v-card-text>
         Hash: <a :href="nodeURL + '/transaction/' + txHash" target="_blank">{{ txHash }}</a> 
        </v-card-text>
      </v-card>
  </v-layout>
</template>

<script>
import {
  NetworkType,
  Account,
  TransferTransaction,
  Deadline,
  Address,
  PlainMessage,
  NetworkCurrencyMosaic,
  UInt64,
  TransactionHttp
} from "nem2-sdk";

export default {
  data: function() {
    return {
      txMessage: "",
      txAmount: 0,
      txRecipient: "",
      userPrivateKey: "",
      signedTx: null,
      dialog: false,
      nodeURL: "http://54.178.241.129:3000", //temp hardcode
      transactionHttp: new TransactionHttp("http://54.178.241.129:3000"), //temp hardcode
      txHash: ""
    };
  },
  methods: {
    sendTransferTransaction: function() {
      this.dialog = false;

      const recipientAddr = Address.createFromRawAddress(this.txRecipient);
      const signerAccount = Account.createFromPrivateKey(
        this.userPrivateKey,
        NetworkType.MIJIN_TEST
      );

      const transferTx = TransferTransaction.create(
        Deadline.create(),
        recipientAddr,
        [NetworkCurrencyMosaic.createRelative(UInt64.fromUint(this.txAmount))],
        PlainMessage.create(this.txMessage),
        NetworkType.MIJIN_TEST
      );
      
      this.signedTx = signerAccount.sign(transferTx);

      if (this.signedTx) {
        this.transactionHttp.announce(this.signedTx).subscribe(
          (txAnnouncmentResponse)=> {
            if (txAnnouncmentResponse.message ==
              "packet 9 was pushed to the network via /transaction") {
              this.txHash = this.signedTx.hash;
            }
          },
          (err) => console.log(err)
        );
      }
    },
  }
};
</script>
