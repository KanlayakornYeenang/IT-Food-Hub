<template>
  <div>
    <v-container fluid class="pa-0">
      <div class="d-flex banner justify-center align-center pt-10 pb-10" style="height:390px">
        <v-col cols="8" class="rounded-lg">
          <div class="py-4">
            <p class="text-h3 fw-600">
              Pick Order
              <v-icon size="x-small"><v-img src="@/assets/take-away.png"></v-img></v-icon>
            </p>
            <p>
              เรากำลังมองหาคนส่งอาหารที่มีความสามารถและความกระตือรือร้นในการให้บริการมาเข้าร่วมกับเรา!
            </p>
          </div>
          <div class="py-4"><v-text-field append-inner-icon="mdi-magnify" v-model="searchText"
              placeholder="Search by restaurant name or desired destination"></v-text-field></div>
        </v-col>
      </div>
    </v-container>
    <v-container fluid class="pa-0 bg-grey-lighten-4">
      <v-divider></v-divider>
      <div class="py-3">
        <v-col cols="8" class="pa-0 d-flex my-3 mt-6 pl-3 mx-auto">
          <p class="text-h5 fw-600">{{ orders.length || 0 }} คำสั่งซื้อ</p>
        </v-col>
        <v-col cols="8" class="d-flex my-3 mx-auto">
          <v-row v-if="user && orders.length > 0">
            <v-col class="pa-2" v-for="order in orders" :key="order" cols="12" xl="3" lg="6" md="6">
              <OrderCard :user_id="user.user_id" :order="order" />
            </v-col>
          </v-row>
        </v-col>
      </div>
    </v-container>
  </div>
</template>

<style scoped>
.banner {
  background-image: url("@/assets/bannerpattern1.png");
  background-repeat: repeat-x;
  background-position: left center;
}
</style>

<script setup>
import OrderCard from "@/components/pickorder/OrderCard.vue";

</script>
<script>
import axios from "@/plugins/axios";
export default {
  props: {
    user: {
      type: Object
    },
  },
  data() {
    return {
      orders: [],
      searchText: ''
    };
  },
  mounted() {
    this.getAllcarts()
  },
  methods: {
    getAllcarts() {
      axios.get("api/getOrder").then((res) => {
        this.orders = res.data
      }).catch((err) => {
        this.$router.push("/itfoodhub/user/mydelivery")
      })
    },
  },
  computed:{
    filteredOrder(){
      if(!this.orders){
        return []
      }
      return this.orders.filter(order => order.order_id.toLowerCase().includes(this.searchText.toLowerCase()))
    }
  },
};
</script>
