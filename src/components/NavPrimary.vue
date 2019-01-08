<template>
  <v-toolbar dark color="primary" fixed>
    <v-toolbar-side-icon></v-toolbar-side-icon>

    <v-toolbar-title class="white--text">Title</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-progress-circular indeterminate color="red" v-if="isLoading"></v-progress-circular>
  </v-toolbar>
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
</style>