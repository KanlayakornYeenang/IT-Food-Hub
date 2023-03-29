<template>
  <v-main>
    <div class="foodhub">
      <HeaderSearchBar></HeaderSearchBar>
      <HomeBanner></HomeBanner>
      <HomeCategories
        @clicked-show-category-name="clickedShowCategoryName"
      ></HomeCategories>
      <HomeRestaurantList
        :restaurants="data"
        :category="category"
      ></HomeRestaurantList>
    </div>
  </v-main>
</template>

<style scoped>
</style>

<script setup>
import HeaderSearchBar from "@/components/HeaderSearchBar.vue";
import HomeBanner from "@/components/HomeBanner.vue";
import HomeCategories from "@/components/HomeCategories.vue";
import HomeRestaurantList from "@/layouts/default/HomeRestaurantList.vue";
</script>

<script>
export default {
  data: () => ({
    refresh_token: "",
    access_token: "",
    nameUser: "",
    category: "",
  }),
  props: {
    data: {
      type: Array,
    },
  },
  methods: {
    clickedShowCategoryName: function (category) {
      if (this.category != category) {
        this.category = category;
      } else {
        this.category = "";
      }
      console.log(this.category);
    },
  },
  beforeCreate() {
    console.log(this.data);
  },
};
</script>