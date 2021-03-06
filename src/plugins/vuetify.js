import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify, {
  theme: {
    primary: colors.indigo.base,
    secondary: colors.blue.base,
    accent: colors.pink.base,
    error: colors.red.base,
    warning: colors.yellow.base
  },
  customProperties: true,
  iconfont: "md"
});
