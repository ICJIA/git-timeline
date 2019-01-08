

<template>
  <v-container style="margin-top: 80px">
    <v-timeline>
      <v-timeline-item v-for="(event, index) in data" :key="index" color="red lighten-2" small>
        <v-card class="elevation-2">
          <v-card-title class="headline">{{event.type}}</v-card-title>
          <v-card-text>
            <div>{{event.payload}}</div>
            <div>{{event.created_at}}</div>
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
import lodash from "lodash";
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
        console.log(this.pushEvents);
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
            this.$store.commit("STOP_LOADER");
          })
          .catch(err => {
            // document.body.textContent = "Error: " + err.stack;
            this.$store.commit("STOP_LOADER");
          });
      } else {
        this.$store.commit("STOP_LOADER");
        // console.log("THE END");
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
        if (e.type === "PushEvent") {
          this.pushEvents.push(e);
        }
      });

      this.$forceUpdate();
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  }
};
</script>
