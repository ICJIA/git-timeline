<template>
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