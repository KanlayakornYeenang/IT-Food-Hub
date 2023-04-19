<template>
  <div class="d-flex align-center justify-center">
    <v-col cols="8" class="pa-0">
      <v-tabs v-model="tab" bg-color="itlight" color="it">
        <v-tab value="รวม" class="mx-auto">รวม</v-tab>
        <v-tab value="ข้าวแกง" class="mx-auto">ข้าวแกง</v-tab>
        <v-tab value="อาหารตามสั่ง" class="mx-auto">อาหารตามสั่ง</v-tab>
        <v-tab value="ก๋วยเตี๋ยว" class="mx-auto">ก๋วยเตี๋ยว</v-tab>
        <v-tab value="เครื่องดื่ม" class="mx-auto">เครื่องดื่ม</v-tab>
        <v-tab value="อาหารทานเล่น" class="mx-auto">อาหารทานเล่น</v-tab>
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