<template>
  <v-layout column>
    <v-layout
      row
      justify-space-between
      align-center
    >
      <h5 class="headline">
        Namespace
      </h5>
      <div>
        <v-btn
          color="primary mx-0"
          @click="registerNamespace = !registerNamespace"
        >
          Register Namespace
        </v-btn>
      </div>
    </v-layout>
    <NamespaceRegistration
      v-show="registerNamespace"
      @closeComponent="registerNamespace = false"
    />
    <v-layout
      row
      justify-space-between
      align-center
    >
      <h5 class="subheading">
        List
      </h5>
      <div>
        <v-btn
          color="primary mx-0"
          @click="reloadNamespaceNotifier++"
        >
          Reload List
        </v-btn>
      </div>
    </v-layout>
    <NamespaceList
      class="my-2"
      :reload-namespace-notifier="reloadNamespaceNotifier"
    />
  </v-layout>
</template>
<script>
import NamespaceRegistration from './NamespaceRegistration.vue';
import NamespaceList from './NamespaceList.vue';

export default {
  components: {
    NamespaceRegistration,
    NamespaceList,
  },
  data() {
    return {
      registerNamespace: false,
      reloadNamespaceNotifier: 0,
    };
  },
};
</script>
<style scoped>
</style>
