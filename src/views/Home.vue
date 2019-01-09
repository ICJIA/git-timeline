

<template>
  <v-container style="margin-top: 80px">
    <v-timeline>
      <v-timeline-item v-for="(event, index) in events" :key="index" color="secondary" small>
        <v-card class="elevation-2">
          <v-card-title class="headline">{{displayDate(event)}}</v-card-title>
          <v-card-text>
            <span v-for="(e, index) in event" :key="index">
              <div class="mb-5" v-html="displayEvent(e)"></div>
            </span>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <Trigger @triggerIntersected="loadMore"/>
    <div v-if="isLastPage" class="text-xs-center mt-5">
      <h1>END OF RECENT ACTIVITY</h1>
      <h3 class="mt-3 mb-5">
        <a href="https://github.com/icjia">https://github.com/icjia</a>
      </h3>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import config from "@/config";
const parse = require("parse-link-header");
import moment from "moment";
import Trigger from "@/components/Trigger";
export default {
  components: { Trigger },
  data() {
    return {
      events: [],
      headers: null,
      data: [],
      page: 1,
      nextURL: null,
      isLastPage: false,
      pushEvents: []
    };
  },

  mounted() {
    console.log(this.page);
    this.$store.commit("START_LOADER");
    axios
      .get(`/users/${config.user}/events?page=1&per_page=${config.perPage}`, {
        headers: {
          Authorization: "token " + process.env.VUE_APP_GITHUB_TOKEN
        }
      })
      .then(response => {
        this.parseLinkHeader(response.headers.link);
        this.data = response.data;

        this.structureEvents(this.data);
        //console.log(this.pushEvents);
        this.$store.commit("STOP_LOADER");
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    async loadMore() {
      this.$store.commit("START_LOADER");
      this.page += 1;
      // console.log("Loading ...", this.page);
      if (!this.isLastPage) {
        axios
          .get(
            `/users/${config.user}/events?page=${this.page}&per_page=${
              config.perPage
            }`,
            {
              headers: {
                Authorization: "token " + process.env.VUE_APP_GITHUB_TOKEN
              }
            }
          )
          .then(response => {
            this.data = [...this.data, ...response.data];
            this.parseLinkHeader(response.headers.link);
            this.structureEvents(this.data);
            this.$store.commit("STOP_LOADER");
          })
          .catch(err => {
            this.$store.commit("STOP_LOADER");
          });
      } else {
        this.$store.commit("STOP_LOADER");
      }
    },
    parseLinkHeader(linkHeader) {
      let parsed = parse(linkHeader);
      // console.log(parsed);
      if (parsed.next) {
        this.next = parsed.next;
      } else {
        this.isLastPage = true;
      }
    },
    structureEvents(data) {
      this.startDate = moment(data[0]["created_at"]);
      this.endDate = moment(data[data.length - 1]["created_at"]);
      this.duration = this.startDate.diff(this.endDate, "days");

      data.forEach(e => {
        let created_at_short = moment(e.created_at).format("YYYY-MM-DD");
        e.created_at_short = created_at_short;
      });
      let result = _.chain(data)
        .groupBy("created_at_short")
        .value();

      this.events = result;
      this.$forceUpdate();
    },
    displayEvent(event) {
      let type, repo, message, time, url;
      switch (event.type) {
        case "PushEvent":
          type = "Pushed Commit";
          repo = event.repo.name;
          url = event.repo.url;
          message = event.payload.commits[0].message;
          time = moment(event.created_at).format("h:mm a");
          break;
        case "CreateEvent":
          type = "Created New Repository";
          repo = event.repo.name;
          url = event.repo.url;
          message = "";
          time = moment(event.created_at).format("h:mm a");
          break;
        case "ReleaseEvent":
          type = "Released New Version";
          repo = event.repo.name;
          url = event.repo.url;
          message = event.payload.release.tag_name;
          time = moment(event.created_at).format("h:mm a");
          break;
        case "WatchEvent":
          type = "Began Watching";
          repo = event.repo.name;
          url = event.repo.url;
          message = "";
          time = "";
          break;
      }
      let template = ` 
      <h3>${time}</h3>
      <h2>${type}</h2>
      <h4><a href="${url}">${repo}</a></h4>
      <p>${message}</p>`;
      return template;
    },
    displayDate(event) {
      return moment(event[0].created_at_short).format("dddd, MMMM DD, YYYY");
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  }
};
</script>
