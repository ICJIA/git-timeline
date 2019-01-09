import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: null,
    PushEvent: true,
    WatchEvent: true,
    CreateEvent: true,
    ReleaseEvent: true,
    DeleteEvent: true,
    PublicEvent: true,
    PullRequestEvent: true,
    IssueCommentEvent: true
  },
  mutations: {
    START_LOADER(state) {
      state.isLoading = true;
    },
    STOP_LOADER(state) {
      state.isLoading = false;
    },
    TOGGLE_EVENT(state, event) {
      switch (event) {
        case "PushEvent":
          state.PushEvent = !state.PushEvent;
          break;
        case "WatchEvent":
          state.WatchEvent = !state.WatchEvent;
          break;
        case "CreateEvent":
          state.CreateEvent = !state.CreateEvent;
          break;
        case "ReleaseEvent":
          state.ReleaseEvent = !state.ReleaseEvent;
          break;
        case "DeleteEvent":
          state.DeleteEvent = !state.DeleteEvent;
          break;
        case "PublicEvent":
          state.PublicEvent = !state.PublicEvent;
          break;
        case "PullRequestEvent":
          state.PullRequestEvent = !state.PullRequestEvent;
          break;
        case "IssueCommentEvent":
          state.IssueCommentEvent = !state.IssueCommentEvent;
          break;
      }
    }
  },
  actions: {
    toggleEvent({ commit }, event) {
      commit("TOGGLE_EVENT", event);
    }
  },
  getters: {
    isLoading: state => state.isLoading
  }
});
