<template>
  <v-app>
    <v-content>
      <v-container grid-list-md>
        <h4>NEM2 Wallet 0.0.1</h4>
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

                <v-list-tile @click>
                  <v-list-tile-action>
                    <v-icon>account_circle</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>Account</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-group no-action prepend-icon="dns">
                  <template v-slot:activator>
                    <v-list-tile>
                      <v-list-tile-title>Namespaces</v-list-tile-title>
                    </v-list-tile>
                  </template>
                  <v-list-tile @click>
                    <v-list-tile-title>Management</v-list-tile-title>
                    <v-list-tile-action>
                      <v-icon>add</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list-group>

                <v-list-group no-action prepend-icon="group_work">
                  <template v-slot:activator>
                    <v-list-tile>
                      <v-list-tile-title>Assets</v-list-tile-title>
                    </v-list-tile>
                  </template>
                  <v-list-tile @click>
                    <v-list-tile-title>Management</v-list-tile-title>
                    <v-list-tile-action>
                      <v-icon>add</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list-group>

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
          <v-flex xs10 px-4>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {};
</script>
