<template>
  <div class="px-8">
    <div class="py-5">
      <p class="h2">พี่ช้าง</p>
      <div class="d-flex justify-space-between">
        <div class="d-flex">
          <div class="d-flex align-center">
            <v-btn
              class="text-it"
              size="x-small"
              icon="mdi-minus-thick"
            ></v-btn>
            <p style="font-size: 1.5rem; font-weight: 600" class="px-3">1</p>
            <v-btn class="text-it" size="x-small" icon="mdi-plus-thick"></v-btn>
            <v-img
              class="img mx-5"
              width="80"
              cover
              aspect-ratio="1"
              src="https://cf.shopee.co.th/file/5160e1eb7f9b68c33e15e06780dac2ca"
            >
            </v-img>
          </div>

          <div>
            <p style="font-size: 1.1rem; font-weight: 400">กะเพรา</p>
            <p style="font-weight: 300" class="text-amber-darken-1">
              หมู ไข่ดาว
            </p>
          </div>
        </div>
        <p style="font-size: 1.5rem; font-weight: 600">50</p>
      </div>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<style scoped>
.img {
  border-radius: 1rem;
}
</style>