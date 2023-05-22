<template>
  <div>
    <v-container fluid class="pa-0">
      <Header v-if="restaurant" :restaurant="restaurant" :categories="categories" />
    </v-container>
    <v-container fluid class="pa-0 bg-grey-lighten-4">
      <v-divider></v-divider>
      <div class="py-5">
        <div class="d-flex justify-center align-center py-5" v-for="category, category_index in categories"
          :key="category_index" :ref="category.menu_cat" :id="category.menu_cat">
          <v-col cols="8">
            <v-card class="w-100 mb-6" color="transparent" elevation="0">
              <v-card-item class="pa-0">
                <v-card-title>
                  <p class="text-h3 fw-600">{{ category.menu_cat }}</p>
                </v-card-title>
              </v-card-item>
            </v-card>
            <v-row class="py-2">
              <v-col cols="12" sm="3" v-for="(item, i) in category.menu" :key="i">
                <MenuCard :restaurant_name="restaurant.rst_name" :menu="item" />
              </v-col>
            </v-row>
          </v-col>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import Header from "@/components/restaurant/Header.vue";
import MenuCard from "@/components/restaurant/MenuCard.vue";
</script>

<script>
import axios from "@/plugins/axios.js";
import eventbus from "@/plugins/eventBus";

export default {
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      restaurant: null,
      categories: null,
    };
  },
  mounted() {
    axios
      .get(this.$route.path)
      .then((res) => {
        this.restaurant = res.data.restaurant;
        this.categories = res.data.category
        console.log(this.categories)
      })
      .catch((err) => {
        this.$router.push("/");
        console.log(err);
      });
    eventbus.on('updateCategory', category => {
      const targetDiv = document.getElementById(category);
      targetDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
    })
  },
};
</script>