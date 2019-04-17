// Copyright (C) 2019 Contributors as noted in the AUTHORS file
// 
// This file is part of nem2-wallet-browserextension.
// 
// nem2-wallet-browserextension is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// nem2-wallet-browserextension is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with nem2-wallet-browserextension.  If not, see <http://www.gnu.org/licenses/>.

<template>
  <v-app>
    <v-content>
      <v-alert :value="true" type="warning" class="ma-0">
        Please be aware this is a Wallet for development proposes, it has no security and the private keys are stored in plain text.
        <strong>DO NOT USE IN MAIN NET or PRODUCTION PRIVATE NETWORKS</strong>
      </v-alert>
      <v-container grid-list-md>
        <v-layout row justify-space-between align-center>
          <h4>NEM2 Wallet 0.0.4</h4>
          <WalletSelector
            :walletName="sharedState.activeWallet.name"
            :wallets="sharedState.wallets.map(({name})=>name)"
          />
          </walletselector>
        </v-layout>
        <v-layout justify-start row>
          <v-flex shrink pa-0>
            <v-navigation-drawer
              permanent
              floating
              v-model="drawer"
              :mini-variant.sync="mini"
              hide-overlay
              stateless
            >
              <v-toolbar
                class="pointer"
                flat
                @click.stop="mini = !mini"
              >
                <v-list>
                  <v-list-tile>
                    <v-list-tile-title class="title">Menu</v-list-tile-title>
                  </v-list-tile>
                </v-list>
                <v-list-tile-action>
                  <v-btn icon @click.stop="mini = !mini">
                    <v-icon>chevron_left</v-icon>
                  </v-btn>
                </v-list-tile-action>
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

                <v-list-tile @click to="/about">
                  <v-list-tile-action>
                    <v-icon>info</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>About</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-navigation-drawer>
          </v-flex>
          <v-flex grow pl-3 ml-2>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import StateRepository from '../infrastructure/StateRepository';
import WalletSelector from "./WalletSelector.vue";

export default {
  components: {
    WalletSelector
  },
  data() {
    return {
      sharedState: StateRepository.state,
      drawer: true,
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ],
      mini: false,
      right: null
    };
  }
};
</script>
