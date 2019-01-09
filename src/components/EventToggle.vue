<template>
  <div class="mb-3">
    <div class="text-xs-center">
      <v-btn small color="primary" @click="toggleView('PushEvent')" class="shrink">Commits</v-btn>
      <v-btn small color="primary" @click="toggleView('WatchEvent')" class="shrink">Watching</v-btn>
      <v-btn small color="primary" @click="toggleView('CreateEvent')" class="shrink">Create</v-btn>
      <v-btn small color="primary" @click="toggleView('ReleaseEvent')" class="shrink">Releases</v-btn>
      <v-btn small color="primary" @click="toggleView('DeleteEvent')" class="shrink">Delete</v-btn>
      <v-btn small color="primary" @click="toggleView('PublicEvent')" class="shrink">Public</v-btn>
      <v-btn
        small
        color="primary"
        @click="toggleView('PullRequestEvent')"
        class="shrink"
      >Pull Requests</v-btn>

      <v-btn small color="primary" @click="toggleView('IssueCommentEvent')" class="shrink">Comments</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toggleView(event) {
      this.$store.dispatch("toggleEvent", event);
    }
  }
};
</script>

<style scoped>
.v-btn--small.shrink {
  font-size: 10px !important;
  font-weight: 900;
}
</style>