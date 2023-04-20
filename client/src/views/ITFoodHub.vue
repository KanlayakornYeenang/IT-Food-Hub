<template>
  <div>
    <v-container fluid class="pa-0">
      <Header />
    </v-container>
    <v-container fluid class="pa-0 bg-grey-lighten-4">
      <v-divider></v-divider>
      <div class="d-flex justify-center align-center">
        <v-col cols="8" class="d-flex my-3">
          <v-row>
            <v-col cols="3" v-for="i in 6" :key="i">
              <v-card
                color="it"
                class="w-100"
                elevation="2"
                rounded="lg"
                to="/itfoodhub/ป้าไม่ได้อะไรเลย"
              >
                <v-img
                  cover
                  height="180"
                  src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                ></v-img>
                <v-card-item class="pa-3">
                  <v-card-title class="d-flex justify-space-between"
                    ><p class="text-amber fw-600">ป้าไม่ได้อะไรเลย</p>
                    <v-chip class="bg-success">เปิด</v-chip></v-card-title
                  >
                  <v-chip-group>
                    <v-chip>อาหารทานเล่น</v-chip>
                    <v-chip>เครื่องดื่ม</v-chip>
                  </v-chip-group>
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import Header from "@/components/itfoodhub/Header.vue";
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