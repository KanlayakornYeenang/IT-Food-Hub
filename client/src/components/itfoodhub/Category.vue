<template>
  <div class="d-flex align-center justify-center">
    <v-col cols="8" class="pa-0">
      <v-tabs v-model="tab" bg-color="itlight" color="it" stacked>
        <v-tab value="รวม" class="mx-auto">รวม</v-tab>
        <v-tab value="ข้าวแกง" class="mx-auto"
          ><v-icon class="ma-1"><v-img src="@/assets/curry-rice.png"></v-img></v-icon>
          ข้าวแกง</v-tab
        >
        <v-tab value="อาหารตามสั่ง" class="mx-auto"
          ><v-icon class="ma-1"><v-img src="@/assets/egg.png"></v-img></v-icon
          >อาหารตามสั่ง</v-tab
        >
        <v-tab value="ก๋วยเตี๋ยว" class="mx-auto"
          ><v-icon class="ma-1"><v-img src="@/assets/noodle.png"></v-img></v-icon
          >ก๋วยเตี๋ยว</v-tab
        >
        <v-tab value="เครื่องดื่ม" class="mx-auto"
          ><v-icon class="ma-1"><v-img src="@/assets/drink.png"></v-img></v-icon
          >เครื่องดื่ม</v-tab
        >
        <v-tab value="อาหารทานเล่น" class="mx-auto"
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
};
</script>