<template>
  <!-- <v-toolbar dark color="primary" fixed>
    <v-toolbar-side-icon></v-toolbar-side-icon>

    <v-toolbar-title class="white--text">Title</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-progress-circular indeterminate color="secondary" v-if="isLoading"></v-progress-circular>
  </v-toolbar>-->
  <div class="loader">
    <v-progress-circular indeterminate color="secondary" v-if="isLoading"></v-progress-circular>
  </div>
</template>

<script>
export default {
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  }
};
</script>

<style scoped>
.loader {
  position: fixed;
  bottom: 10px;
  left: 49%;
}
</style>