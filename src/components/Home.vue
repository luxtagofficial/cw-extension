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
// along with nem2-wallet-browserextension.  If not, see http://www.gnu.org/licenses/.

<template>
  <v-layout
    row
    pb-2
    mt-4
  >
    <v-container
      fluid
      pa-0
      ma-0
    >
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
        >
          <Errors style="margin-bottom:35px !important" />
          <v-card
            v-if="
              wallet.wallets.length > 0 &&
                wallet.activeWallet
            "
          >
            <v-toolbar
              card
              prominent
            >
              <v-toolbar-title>{{ wallet.activeWallet.name }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container
                fluid
                grid-list-sm
              >
                <v-layout
                  row
                  wrap
                >
                  <v-flex
                    d-flex
                    xs12
                    order-xs1
                  >
                    <v-layout column>
                      <v-flex d-flex>
                        <v-card
                          color="blue-grey"
                          dark
                          tile
                          flat
                        >
                          <v-card-text>
                            <v-text-field
                              :value="wallet.activeWallet.isWatchOnly
                                ?wallet.activeWallet.publicAccount.address.pretty()
                                :wallet.activeWallet.account.address.pretty()"
                              class="mt-4 mr-0 mb-0 ml-0 pa-0 monospaced"
                              label="Address"
                              readonly
                            />

                            <v-text-field
                              :value="accountInfo.accountInfo
                                ?accountInfo.accountInfo[wallet.activeWallet.name].publicKey
                                : 'unknown'"
                              class="ma-0 pa-0 monospaced"
                              label="Public Key"
                              readonly
                            />

                            <v-text-field
                              v-if="showPrivateKey"
                              :value="wallet.activeWallet.isWatchOnly
                                ?'watch only'
                                :wallet.activeWallet.account.privateKey"
                              class="ma-0 pa-0 monospaced"
                              label="Private Key"
                              readonly
                            />

                            <v-text-field
                              :value="wallet.activeWallet.node"
                              class="ma-0 pa-0 monospaced"
                              label="Node"
                              readonly
                            />
                            <div style="text-align: right">
                              <v-btn
                                flat
                                class="float:right !important"
                                @click.stop="showPrivateKey = !showPrivateKey"
                              >
                                {{ !showPrivateKey ? 'show private key' : 'hide private key' }}
                              </v-btn>
                            </div>
                          </v-card-text>
                        </v-card>
                      </v-flex>
                      <v-flex d-flex>
                        <v-card
                          color="brown"
                          dark
                          tile
                          flat
                        >
                          <v-card-text>
                            <span>{{ 'lorem 2' }}</span>
                          </v-card-text>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex
                    d-flex
                    xs12
                    sm7
                  >
                    <v-layout
                      row
                      wrap
                    >
                      <v-flex d-flex>
                        <v-card
                          color="indigo lighten-2"
                          dark
                          tile
                          flat
                        >
                          <v-card-text>{{ 'lorem 3' }}</v-card-text>
                        </v-card>
                      </v-flex>
                      <v-flex d-flex>
                        <v-layout row>
                          <v-flex
                            v-for="n in 2"
                            :key="n"
                            d-flex
                          >
                            <v-card
                              color="amber lighten-2"
                              tile
                              flat
                            >
                              <v-card-text>{{ 'lorem 4' }}</v-card-text>
                            </v-card>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex
                    d-flex
                    xs12
                    sm2
                    child-flex
                  >
                    <v-card
                      color="orange lighten-2"
                      tile
                      flat
                    >
                      <v-card-text>{{ 'lorem 5' }}</v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex
                    d-flex
                    xs12
                    sm4
                  >
                    <v-card
                      color="red lighten-2"
                      dark
                      tile
                      flat
                      pa-0
                      style="text-align: center;"
                    >
                      <img
                        :src="QR"
                        style="margin: 10px 11px 4px 11px !important;"
                      >
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout
        row
        wrap
        style="margin-top: 30px !important;"
      >
        <v-flex
          xs12
        >
          <Transactions
            v-if="wallet.wallets.length > 0 &&
              wallet.activeWallet &&
              !application.error &&
              accountInfo.accountInfo"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>
<script>
import { mapState } from 'vuex';
import { QRCodeGenerator } from 'nem2-qr-library';
import Errors from './Errors.vue';
import Transactions from './transactions/Transactions.vue';

export default {
  name: 'Home',
  components: {
    Errors,
    Transactions,
  },
  data() {
    return {
      showPrivateKey: false,
    };
  },
  computed: {
    ...mapState([
      'wallet',
      'accountInfo',
      'application',
      'transactions',
    ], {
      wallet: state => state.wallet,
    }),
    QR() {
      const dataset = `
      {
        "schema": 1,
        "network": "MAIN_NET",
        "nem_version": "Catapult",
        "data": {
          "address": "
          ${this.wallet.activeWallet.isWatchOnly
    ? this.wallet.activeWallet.publicAccount.address.pretty()
    : this.wallet.activeWallet.account.address.pretty()}"
        }
      }`;

      const qr = new QRCodeGenerator(dataset).toBase64();

      console.log(qr, 'QR');

      return qr;
    },
  },
};
</script>

<style scoped>
.account-info-container {
  height: auto;
  overflow: hidden;
}
</style>
