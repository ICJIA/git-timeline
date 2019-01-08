

<template>
  <v-container style="margin-top: 80px">
    <v-timeline>
      <v-timeline-item v-for="(event, index) in data" :key="index" color="red lighten-2" small>
        <!-- <span slot="opposite">{{event.created_at}}</span> -->
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
  created() {},
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
        this.structureEvents(response.data);
        this.$store.commit("STOP_LOADER");
      })
      .catch(err => {
        document.body.textContent = "Error: " + err.stack;
      });
  },
  methods: {
    async loadMore() {
      this.$store.commit("START_LOADER");
      this.page += 1;
      console.log("Loading ...", this.page);
      if (!this.isLastPage) {
        axios
          .get(
            `/users/${config.user}/events?page=${this.page}&per_page=${
              config.perPage
            }`,
            {}
          )
          .then(response => {
            this.data = [...this.data, ...response.data];
            this.parseLinkHeader(response.headers.link);
            this.$store.commit("STOP_LOADER");
          })
          .catch(err => {
            document.body.textContent = "Error: " + err.stack;
            this.$store.commit("STOP_LOADER");
          });
      } else {
        this.$store.commit("STOP_LOADER");
        console.log("THE END");
      }
    },
    parseLinkHeader(linkHeader) {
      let parsed = parse(linkHeader);
      console.log(parsed);
      if (parsed.next) {
        this.next = parsed.next;
      } else {
        this.isLastPage = true;
      }
    },
    structureEvents(data) {
      data.forEach(e => {
        // if (e.type === "PushEvent") {
        //   if (!this.pushEvents[e.repo.name]) {
        //     this.pushEvents[e.repo.name] = [];
        //   }
        // }
        let eventDate = moment().format("MM-DD-YYYY");
        console.log(eventDate);
      });
      // console.log(this.pushEvents);
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  }
};
</script>
