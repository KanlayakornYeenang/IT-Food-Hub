<template>
  <v-card
    rounded="xl"
    min-height="220"
    color="#ffffff"
    class="d-flex flex-column justify-center overflow-visible"
    style="position: relative; transform: translateY(-6.25rem)"
  >
    <div class="bannertitle d-flex flex-column">
      <div class="d-flex">
        <p style="font-weight: 600; font-size: 2.75rem" class="pb-4">
          {{restaurant.Restaurant_name}} - {{restaurant.Restuarant_Location}}
        </p>
        <div class="px-3"></div>
        <v-switch
          :model-value="status"
          color="success"
          hide-details
          inset
          :label="`${status ? 'Open' : 'Close'}`"
          @click="status = !status"
        ></v-switch>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    status: true,
  }),
  props: {
    restaurant : {
      type : Object
    }
  }
};
</script>

<style scoped>
.bannertitle {
  font-size: 2.75rem;
}
.v-card {
  background-size: cover;
  background-image: url("/src/assets/bannerpattern2.png");
}
.men {
  position: absolute;
  right: 1.25%;
  transform: translateY(-12%);
}
</style>