<template>
  <v-app>
    <loader></loader>
    <div v-if="isLoading" style="z-index: 1000">
      <v-progress-linear
        :indeterminate="true"
        color="blue-grey lighten-3"
        style="position: fixed; top: -15px;"
        height="5"
      ></v-progress-linear>
    </div>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Loader from "@/components/Loader";
export default {
  name: "App",
  components: {
    Loader
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    }
  }
};
</script>


