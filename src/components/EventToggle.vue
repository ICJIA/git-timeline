<template>
  <v-toolbar fixed>
    <v-toolbar-title>Recent GitHub Activity</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
        small
        :color="getColor(this.$store.state.PushEvent)"
        flat
        @click="toggleView('PushEvent')"
        class="shrink"
      >Commits</v-btn>
      <v-btn
        small
        :color="getColor(this.$store.state.WatchEvent)"
        flat
        @click="toggleView('WatchEvent')"
        class="shrink"
      >Watching</v-btn>
      <v-btn
        small
        :color="getColor(this.$store.state.CreateEvent)"
        flat
        @click="toggleView('CreateEvent')"
        class="shrink"
      >Create</v-btn>
      <v-btn
        small
        :color="getColor(this.$store.state.ReleaseEvent)"
        flat
        @click="toggleView('ReleaseEvent')"
        class="shrink"
      >Releases</v-btn>
      <v-btn
        small
        :color="getColor(this.$store.state.DeleteEvent)"
        flat
        @click="toggleView('DeleteEvent')"
        class="shrink"
      >Delete</v-btn>
      <v-btn
        small
        :color="getColor(this.$store.state.PublicEvent)"
        flat
        @click="toggleView('PublicEvent')"
        class="shrink"
      >Public</v-btn>
      <v-btn
        small
        :color="getColor(this.$store.state.PullRequestEvent)"
        flat
        @click="toggleView('PullRequestEvent')"
        class="shrink"
      >Pull Requests</v-btn>

      <v-btn
        small
        :color="getColor(this.$store.state.IssueCommentEvent)"
        flat
        @click="toggleView('IssueCommentEvent')"
        class="shrink"
      >Comments</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    toggleView(event) {
      this.$store.dispatch("toggleEvent", event);
    },
    getColor(event) {
      const color = event ? "primary" : "grey";
      return color;
    }
  }
};
</script>

<style scoped>
.v-btn--small.shrink {
  font-size: 12px !important;
  font-weight: 900;
}
.fixed {
  position: fixed;
  z-index: 5000;
}
</style>