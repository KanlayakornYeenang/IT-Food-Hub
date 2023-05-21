<template>
  <div >
    <v-container fluid class="pa-0" style="height:390px">
      <Header />

    </v-container>
    <v-container fluid class="pa-0 bg-grey-lighten-4">
      <v-divider></v-divider>
      <div class="d-flex justify-center align-center">
        <v-col cols="8" class="d-flex my-3">
          <v-row>
            <v-col cols="3" v-for="restaurant,i in filteredRes" :key="i">
              <RestaurantCard :restaurant="restaurant"/>
            </v-col>
            <div v-if="filteredRes.length == 0" style="display: flex; align-items:center; justify-content:center">
              no restaurant found
            </div>
          </v-row>
        </v-col>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import Header from "@/components/itfoodhub/Header.vue";
import RestaurantCard from "@/components/itfoodhub/RestaurantCard.vue";
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
    searchText: String,
  },
  mounted() {
    axios
      .get("itfoodhub/getAllRestaurants")
      .then((res) => {
        this.restaurants = res.data;
        console.log(res.data);
      })
      .catch((err) => {
        this.$router.push("/");
      });
  },
  computed:{
    filteredRes(){
      if(!this.restaurants){
        return []
      }
      return this.restaurants.filter(res => res.rst_name.toLowerCase().includes(this.searchText.toLowerCase()))
    }
  },
};
</script>