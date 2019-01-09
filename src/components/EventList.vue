<template>
  <div class="mb-5" :class="getStatus(event.type)">
    <h3>{{time}}</h3>
    <h2>{{type}}</h2>
    <h4>
      <a :href="repoURL">{{repo}}</a>
    </h4>
    <p>{{message}}</p>
  </div>
</template>

<script>
import _ from "lodash";
import config from "@/config";
import moment from "moment";
export default {
  data() {
    return {
      type: "",
      repo: "",
      repoURL: "",
      message: "",
      time: "",
      typeRef: ""
    };
  },
  mounted() {
    let baseURL = "https://github.com/";
    switch (this.event.type) {
      case "PushEvent":
        this.type = "Pushed Commit";
        this.repo = this.event.repo.name;
        this.repoURL = `${baseURL}${this.event.repo.name}`;
        this.message = this.event.payload.commits[0].message;
        this.time = moment(this.event.created_at).format("h:mm a");
        break;
      case "CreateEvent":
        this.type = "Created New Repository";
        this.repo = this.event.repo.name;
        this.repoURL = `${baseURL}${this.event.repo.name}`;
        this.message = "";
        this.time = moment(this.event.created_at).format("h:mm a");
        break;
      case "ReleaseEvent":
        this.type = "Released New Version";
        this.repo = this.event.repo.name;
        this.repoURL = `${baseURL}${this.event.repo.name}`;
        this.message = this.event.payload.release.tag_name;
        this.time = moment(this.event.created_at).format("h:mm a");
        break;
      case "WatchEvent":
        this.type = "Began Watching";
        this.repo = this.event.repo.name;
        this.repoURL = `${baseURL}${this.event.repo.name}`;
        this.message = "";
        this.time = "";
        break;
      case "DeleteEvent":
        this.type = "Deleted Repository";
        this.repo = this.event.repo.name;
        this.repoURL = `${baseURL}${this.event.repo.name}`;
        this.message = "";
        this.time = "";
        break;
      case "PullRequestEvent":
        this.type = "Pull Request";
        this.repo = this.event.repo.name;
        this.repoURL = `${baseURL}${this.event.repo.name}`;
        this.message = this.event.payload.pull_request.title;
        this.time = moment(this.event.created_at).format("h:mm a");
        break;
      case "IssueCommentEvent":
        this.type = "Issued Comment";
        this.repo = this.event.repo.name;
        this.repoURL = `${baseURL}${this.event.repo.name}`;
        this.message = `
          <h4>${this.event.payload.issue.title}</h4>
          <p class="ml-3 mr-3 mt-2">${this.event.payload.comment.body}</p>`;
        this.time = moment(this.event.created_at).format("h:mm a");
        break;
      case "PublicEvent":
        this.type = "Made Private Repo Public";
        this.repo = this.event.repo.name;
        this.repoURL = `${baseURL}${this.event.repo.name}`;
        this.message = ``;
        this.time = moment(this.event.created_at).format("h:mm a");
        break;
    }
  },
  props: {
    event: {
      type: Object
    }
  },
  methods: {
    getStatus(type) {
      if (type === "PushEvent" && !this.$store.state.PushEvent) {
        return "isHidden";
      }

      if (type === "WatchEvent" && !this.$store.state.WatchEvent) {
        return "isHidden";
      }

      if (type === "CreateEvent" && !this.$store.state.CreateEvent) {
        return "isHidden";
      }

      if (type === "ReleaseEvent" && !this.$store.state.ReleaseEvent) {
        return "isHidden";
      }

      if (type === "DeleteEvent" && !this.$store.state.DeleteEvent) {
        return "isHidden";
      }

      if (type === "PublicEvent" && !this.$store.state.PublicEvent) {
        return "isHidden";
      }

      if (type === "PullRequestEvent" && !this.$store.state.PullRequestEvent) {
        return "isHidden";
      }

      if (
        type === "IssueCommentEvent" &&
        !this.$store.state.IssueCommentEvent
      ) {
        return "isHidden";
      }

      return null;
    }
  },
  computed: {}
};
</script>

<style scoped>
.isHidden {
  display: none;
}
</style>