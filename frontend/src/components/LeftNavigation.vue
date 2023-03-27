<template>
  <div>
    <!--v-navi if widht > 1200 ? widht = 300px : widht = 230--->
    <v-navigation-drawer permanent location="left" class="align-center"
      :style="{'width': widthNavi+'px'}"
    >
      <template v-slot:prepend>
        <!--v-img if widht > 1200 ? widht = 180px : widht = 120--->
        <v-img class="mt-12" contain  src="@/assets/logo.svg" 
        :style="{'width': widthtemplate+'px'}"
        />
      </template>
      <!--v-div if widht > 1200 ? widht = 180px : widht = 180--->
      <div class="py-16"
      
          :style="{'width': widthDiv+'px'}"
      >

        <v-btn-toggle
          class="d-flex flex-column"
          style="height: fit-content"
          color="it"
          v-model="select"
        >
          <!--v-btn if widht > 1200 ? widht = 200px : widht = 150--->
          <v-btn
            class="mb-4"
            rounded="pill"
            value="home"
            to="/itfoodhub"
            :style="{'width': widhtBtn+'px'}"
          >
            <!--div font if widht > 1200 ? fontsize = 15px : 12px--->
            <v-icon> mdi-home-outline </v-icon>
            <div class="px-2"></div>
            <div style="font-weight: 6000"
              :style="{'font-size': widthFront+'px'}"
            >Home</div>
          </v-btn>
        </v-btn-toggle>

        <v-btn
          class="elevation-0 mb-4"
          rounded="pill"
          value="cart"
          ::style="{'width': widhtBtn+'px'}"
          @click="showCart = !showCart"
        >
          <v-icon> mdi-shopping </v-icon>
          <div class="px-2"></div>
          <div style="font-weight: 600"
          :style="{'font-size': widthFront+'px'}"
          >My Cart</div>
        </v-btn>

        <v-btn-toggle
          class="d-flex flex-column"
          style="height: fit-content"
          color="it"
          v-model="select"
        >
          <v-btn class="mb-4" rounded="pill" value="orders"
          :style="{'width': widhtBtn+'px'}"
          >
            <v-icon> mdi-receipt-text </v-icon>
            <div class="px-2"></div>
            <div style="font-weight: 600"
            :style="{'font-size': widthFront+'px'}"
            >Orders</div>
        </v-btn>
           
        <v-btn
          class="mb-4"
          rounded="pill"
          value="Restuarant"
          v-if="userDetail.Customer_isOwner == 1  "
          :style="{'width': widhtBtn+'px'}"
        >
          <v-icon> mdi-silverware </v-icon>
          <div class="px-2"></div>
          <div style="font-weight: 600"
          :style="{'font-size': widthFront+'px'}"
          >My Restaurant</div>
        </v-btn>

          <v-btn rounded="pill" value="Delivery"
            v-if="userDetail.Customer_isDelivery == 0"
            to="/itfoodhub/order"
            :style="{'width': widhtBtn+'px'}"
          >

            <v-icon> mdi-moped  </v-icon>
            <div class="px-2"></div>
            <div style="font-weight: 600"
            :style="{'font-size': widthFront+'px'}"
            >Delivery</div>
          </v-btn>
        
        </v-btn-toggle>
      </div>
    </v-navigation-drawer>
    <v-overlay v-model="showCart" class="d-flex justify-center align-center">
      <MyCartOverlay />
    </v-overlay>
  </div>
</template>

<style lang="scss" scoped>
.bg-it {
  --v-theme-overlay-multiplier: 0;
}
.v-icon {
  font-size: 2rem;
}
.v-btn {
  display: flex;
  width: 100%;
  justify-content: space-between;
  min-height: 3.5rem;
}
</style>

<script setup>
import MyCartOverlay from "@/components/MyCartOverlay.vue";
</script>

<script>
export default {
  data() {
    return {
      select: undefined,
      showCart: false,
      widthNavi :270,
      widthtemplate: 180,
      widthDiv :180,
      widhtBtn: 200,
      widthFront: 16,
      windowWidth: window.innerWidth
    }},
  mounted() {
    if (this.$route.path == "/itfoodhub") {
      this.select = "home";
    }
    console.log("mounted")
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  methods: {  
    onResize() {
      this.windowWidth = window.innerWidth
      console.log(this.windowWidth)
      if(this.windowWidth < 1200){
        this.widthNavi = 230
        this.widthtemplate =120
        this.widthDiv = 180
        this.widhtBtn = 180
        this.widthFront = 12
      }
      if(this.windowWidth > 1200){
        this.widthNavi = 270
        this.widthtemplate = 180
        this.widthDiv = 180
        this.widhtBtn = 200
        this.widthFront = 16

      }
    }
  },
  props: {
    userDetail: {
      type: Object,
    },
  },
  watch: {
    select(newValue) {
      if (newValue == undefined && this.$route.path == "/itfoodhub") {
        this.select = "home";
      }
    },
    path(newValue) {
      if (!["/itfoodhub"].includes(newValue)) {
        this.select = undefined;
      }
    },
  },
  computed: {
    path() {
      return this.$route.path;
    },
  },
};
</script>