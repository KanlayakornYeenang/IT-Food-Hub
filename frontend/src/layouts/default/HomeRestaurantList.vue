<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(restaurant, i) in filterRestaurants"
        :key="i"
        class="d-flex flex-column justify-center my-4"
        cols="3"
      >
        <v-card
          style="background: none"
          class="elevation-0"
          rounded="xl"
          v-ripple
        >
          <router-link :to="'/itfoodhub/' + restaurant.Restaurant_name">
          <v-card class="restaurant-img ma-auto">
            <v-img
              cover
              height="180"
              aspect-ratio="16/9"
              src="https://cf.shopee.co.th/file/5160e1eb7f9b68c33e15e06780dac2ca"
            >
            </v-img>
          </v-card>
          <v-card
            rounded="xl"
            color="#2255A4"
            class="restaurant-content pt-16 pb-2"
          >
            <v-card-item>
              <v-card-title
                class="py-1 d-flex justify-space-between"
                style="color: #e3b54c"
              >
                <p class="h2">{{ restaurant.Restaurant_name }}</p>
                <p
                  class="px-2 elevation-5"
                  style="
                    font-size: 1rem;
                    color: white;
                    background: #36c144;
                    border-radius: 1rem;
                  "
                >
                  {{ restaurant.status }}
                </p>
              </v-card-title>
              <v-card-subtitle
                ><p style="color: #fff">
                  {{ restaurant.Restuarant_type }}
                </p></v-card-subtitle
              >
            </v-card-item>
          </v-card>
          </router-link>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.restaurant-img {
  border-radius: 2rem;
  width: 90%;
}
.restaurant-content {
  z-index: -1;
  margin-top: -3.75rem;
}
.v-img {
  border: 1.5rem solid white;
  border-radius: 2.75rem;
}
</style>

<script>
import axios from "axios";
export default {
  data: () => ({
    test: "",
  }),
  props: {
    restaurants: {
      type: Array,
    },
    category: {
      type: String,
    },
  },
  methods: {
    //
  },
  computed: {
    filterRestaurants() {
      let restaurants_list = this.restaurants;
      restaurants_list = restaurants_list.filter((item) => {
        return item.Restuarant_type == this.category;
      });
      if (restaurants_list != "") {
        return restaurants_list;
      } else if (restaurants_list != "" || this.category == "") {
        return this.restaurants;
      }
    },
  },
  created() {
    console.log(this.restaurants);
  },
};
</script>