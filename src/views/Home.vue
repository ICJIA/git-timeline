

<template>
  <v-container style="margin-top: 80px">
    <event-toggle></event-toggle>
    <div class="mt-5" style="border-top: 1px solid #ccc;">
      <v-timeline>
        <v-timeline-item v-for="(event, index) in events" :key="index" color="secondary" small>
          <v-card class="elevation-2">
            <v-card-title class="headline">{{displayDate(event)}}</v-card-title>
            <v-card-text>
              <event-list v-for="(e, index) in event" :key="index" :event="e"></event-list>
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
import EventList from "@/components/EventList";
import EventToggle from "@/components/EventToggle";
export default {
  components: { Trigger, EventList, EventToggle },
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
    // console.log(this.page);

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
        this.$forceUpdate;

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
      data.forEach(e => {
        let created_at_short = moment(e.created_at).format("YYYY-MM-DD");
        e.created_at_short = created_at_short;
      });
      let result = _.chain(data)
        .groupBy("created_at_short")
        .value();

      this.events = result;
      this.$forceUpdate;
    },

    displayDate(event) {
      return moment(event[0].created_at_short).format("dddd, MMMM DD, YYYY");
    },
    groupEvents(event) {
      let result = _.chain(event)
        .groupBy("repo.name")
        .value();
      return result;
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  }
};
</script>
