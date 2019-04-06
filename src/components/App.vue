<template>
  <v-app>
    <v-content>
      <v-alert :value="true" type="warning" class="ma-0">
        Please be aware this is a Wallet for development proposes, it has no security and the private keys are stored in plain text. 
        <strong>DO NOT USE IN MAIN NET or PRODUCTION PRIVATE NETWORKS</strong>
      </v-alert>
      <v-container grid-list-md >
        <v-layout row justify-space-between align-center>
          <h4>NEM2 Wallet 0.0.3</h4>
          <WalletSelector />
        </v-layout>
        <v-layout row>
          <v-flex sm>
            <v-navigation-drawer permanent floating>
              <v-toolbar flat>
                <v-list>
                  <v-list-tile>
                    <v-list-tile-title class="title">Menu</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-toolbar>

              <v-divider></v-divider>

              <v-list>
                <v-list-tile @click to="/">
                  <v-list-tile-action>
                    <v-icon>home</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>Home</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click to="/send">
                  <v-list-tile-action>
                    <v-icon>send</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>Send</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <!--
                <v-list-tile @click>
                  <v-list-tile-action>
                    <v-icon>account_circle</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>Account</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                -->

                <v-list-tile @click to="/namespace">
                  <v-list-tile-action>
                    <v-icon>dns</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>Namespaces</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click to="/asset">
                  <v-list-tile-action>
                    <v-icon>group_work</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>Assets</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click to="/wallet">
                  <v-list-tile-action>
                    <v-icon>payment</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>Wallet</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              <v-divider></v-divider>
              <v-list>
                <v-list-tile @click to="/developer-mode">
                  <v-list-tile-action>
                    <v-icon>gamepad</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>Developer mode</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-navigation-drawer>
          </v-flex>
          <v-flex xs10 pl-4>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import WalletSelector from './WalletSelector.vue';

export default {
  components: {
    WalletSelector,
  }
};
</script>
