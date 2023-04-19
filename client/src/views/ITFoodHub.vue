<template>
  <v-container fluid class="pa-0">
    <Banner />
    <Category />
  </v-container>
</template>

<script setup>
import Banner from "@/components/itfoodhub/Banner.vue";
import Category from "@/components/itfoodhub/Category.vue";
</script>

<script>
import axios from "@/plugins/axios.js";

export default {
  data() {
    return {
      restaurants: null,
    };
  },
  props: {
    user: {
      type: Object,
    },
  },
  mounted() {
    axios
      .get("api/itfoodhub")
      .then((res) => {
        this.restaurants = res.data;
      })
      .catch((err) => {
        this.$router.push("/");
      });
  },
};
</script>