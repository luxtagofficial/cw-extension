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
          @click="registerNamespace = true"
        >
          Register Namespace
        </v-btn>
      </div>
    </v-layout>
    <NamespaceRegistration
      v-show="registerNamespace"
      @closeComponent="registerNamespace = false"
    />
    <NamespaceList class="my-2" />
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
    };
  },
};
</script>
<style scoped>
</style>
