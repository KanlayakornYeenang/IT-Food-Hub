<template>
  <div >
    <v-container fluid class="pa-0" style="height:390px">
      <Header  @categorySelected2="handleCategorySelected2"/>
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
      cate:null,
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
  methods: {
    handleCategorySelected2(category) {
      this.cate = category
      console.log(this.cate )
      // this.restaurants = this.restaurants.filter(res => res.cat_name.toLowerCase().includes(this.cate.toLowerCase()))
    }
  },
  computed:{
    filteredRes(){
      if(!this.restaurants){
        return []
      }
      if(this.restaurants){
        if(this.cate!= null){
          return this.restaurants.filter(res => res.cat_name == this.cate)
        }
        if(this.cate == null){
          console.log("null")
          return this.restaurants
        }
        return this.restaurants.filter(res => res.rst_name.toLowerCase().includes(this.searchText.toLowerCase()))
      }
    }
  },
};
</script>