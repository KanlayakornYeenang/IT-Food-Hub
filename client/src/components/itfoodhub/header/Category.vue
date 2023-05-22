<template>
  <div class="d-flex align-center justify-center py-5">
    <v-col cols="8" class="pa-0">
      <v-tabs
        v-model="tab"
        bg-color="itlight"
        color="it"
        class="rounded-lg"
        stacked
      >
        <v-tab value="รวม" class="mx-auto" @click="selectCategory(null)">รวม</v-tab>
        <v-tab value="ข้าวแกง" class="mx-auto" @click="selectCategory('ข้าวแกง')"
          ><v-icon class="ma-1"
            ><v-img src="@/assets/curry-rice.png"></v-img
          ></v-icon>
          ข้าวแกง</v-tab
        >
        <v-tab value="อาหารตามสั่ง" class="mx-auto " @click="selectCategory('อาหารตามสั่ง')"
          ><v-icon class="ma-1"><v-img src="@/assets/egg.png"></v-img></v-icon
          >อาหารตามสั่ง</v-tab
        >
        <v-tab value="ก๋วยเตี๋ยว" class="mx-auto" @click="selectCategory('ก๋วยเตี๋ยว')"
          ><v-icon class="ma-1"
            ><v-img src="@/assets/noodle.png"></v-img></v-icon
          >ก๋วยเตี๋ยว</v-tab
        >
        <v-tab value="เครื่องดื่ม" class="mx-auto" @click="selectCategory('เครื่องดื่ม')"
          ><v-icon class="ma-1"><v-img src="@/assets/drink.png"></v-img></v-icon
          >เครื่องดื่ม</v-tab
        >
        <v-tab value="อาหารทานเล่น" class="mx-auto" @click="selectCategory('อาหารทานเล่น')"
          ><v-icon class="ma-1"><v-img src="@/assets/snack.png"></v-img></v-icon
          >อาหารทานเล่น</v-tab
        >
      </v-tabs>
    </v-col>
  </div>
</template>

<style>
.v-tab--selected {
  font-weight: 600 !important;
}
</style>

<script>
export default {
  data: () => ({
    tab: null,
  }),
  methods:{
    selectCategory(category){
      this.$emit('categorySelected', category);
    }
  }
};
</script>