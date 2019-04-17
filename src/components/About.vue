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
  <v-layout column>
    <h1 class="headline pt-3">About nem2-wallet</h1>

    <h2 class="sub-headline pt-3">For users</h2>

    <v-layout column>
      <v-flex>
        <h2 class="sub-headline pt-3">For developers</h2>

        <v-layout class="align-center ml-0 mb-1">
          <b>Source code repository:</b>
          <a
            href="https://github.com/aleixmorgadas/nem2-wallet-browserextension"
            class="mx-1"
          >https://github.com/aleixmorgadas/nem2-wallet-browserextension</a> licenced under
          <img
            src="https://img.shields.io/badge/License-GPL%20v3-blue.svg"
            class="ml-1"
          >
        </v-layout>

        <ul class="mt-3 faq">
          <li>How can I contribute?</li>
        </ul>
        <p>TODO</p>
        <ul class="mt-3 faq">
          <li>How can I integrate a web-application with this wallet?</li>
        </ul>
        <p>TODO</p>
      </v-flex>
    </v-layout>
  </v-layout>
</template>
<script>
export default {};
</script>
<style scoped>
.sub-headline {
  font-size: 20px;
  font-weight: 400;
}
.faq {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 0.5em;
}
</style>
