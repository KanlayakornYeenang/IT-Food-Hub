<template>
  <v-card class="pt-10 my-10 mx-5 elevation-0">
    <v-card-text
      ><p class="h3" style="fonr-weight: 700">พี่ช้าง</p></v-card-text
    >

    <v-sheet class="d-flex elevation-2 mx-1 my-2 px-5 py-1" rounded="xl" v-for="i,n in 10" :key="n">
      <div class="d-flex align-center">
        <v-btn
          style="transform: scale(0.75)"
          class="text-it"
          variant="outlined"
          icon="mdi-minus-thick"
          size="x-small"
        ></v-btn>
        <p class="px-1">1</p>
        <v-btn
          style="transform: scale(0.75)"
          class="text-it"
          variant="outlined"
          icon="mdi-plus-thick"
          size="x-small"
        ></v-btn>
      </div>

      <img
        style="border-radius: 0.5rem"
        class="ma-4"
        src="https://cf.shopee.co.th/file/5160e1eb7f9b68c33e15e06780dac2ca"
      />

      <v-sheet class="d-flex w-100 justify-space-between">
        <div class="d-flex flex-column justify-center">
          <p>กะเพรา</p>
          <p>หมู ไข่ดาว</p>
        </div>
        <div class="d-flex flex-column justify-center">
          <p>50</p>
          <p>&nbsp;</p>
        </div>
      </v-sheet>
    </v-sheet>
  </v-card>
</template>

<style scoped>
img {
  width: 10%;
}
</style>