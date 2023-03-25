<template>
  <v-card
    rounded="xl"
    min-height="220"
    color="#ffffff"
    class="d-flex flex-column justify-center overflow-visible"
    style="position: relative"
  >
    <div class="bannertitle d-flex flex-column">
      <span class="ml-10">Enjoy Your Meal</span>
      <span class="ml-10"
        >with <span style="color: #fe6612">IT Food Hub</span></span
      >
    </div>
  </v-card>
</template>

<style scoped>
.bannertitle {
  font-size: 2.75rem;
  color: white;
}
.v-card {
  background-image: url("/src/assets/bannerpattern2.png");
}
.men {
  position: absolute;
  right: 1.25%;
  transform: translateY(-12%);
}
</style>