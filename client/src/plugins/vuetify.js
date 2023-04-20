/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

const it = {
  dark: false,
  colors: {
    it: "#2255A4",
    itlight: "#D7E1F1",
    foodhub: "#FE6612",
    foodhublight: "#FFCDB1",
  },
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "it",
    themes: {
      it,
    },
  },
});
