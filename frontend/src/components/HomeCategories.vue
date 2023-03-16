<template>
  <v-container class="pt-7 pb-8">
    <p class="h2">Categories</p>
    <v-btn-toggle
      group
      class="pt-5 d-flex justify-space-between"
      style="height: fit-content"
      color="it"
    >
      <v-btn
        class="px-2 py-2"
        rounded="pill"
        v-for="(category, i) in categories"
        :key="i"
        :value="category.name"
        :ripple="{ class: 'text-it' }"
      >
        <v-avatar color="#D7E1F1">
          <v-img class="icon-category" :src="category.icon" />
        </v-avatar>
        <div class="px-2"></div>
        <div style="font-weight: 600">{{ category.name }}</div>
      </v-btn>
    </v-btn-toggle>
  </v-container>
</template>

<style lang="scss" scoped>
.bg-it {
  --v-theme-overlay-multiplier: 0;
  color: white !important;
}
.v-list {
  background: none;
}
.v-list-item {
  background: white;
}
.icon-category {
  transform: scale(0.7);
}
</style>
<script>
export default {
  data: () => ({
    categories: [
      {
        name: "a la carte",
        icon: "/src/assets/a la carte.png",
      },
      {
        name: "noodles",
        icon: "/src/assets/noodles.png",
      },
      {
        name: "drinks",
        icon: "/src/assets/drinks.png",
      },
      {
        name: "bakery",
        icon: "/src/assets/bakery.png",
      },
      {
        name: "snacks",
        icon: "/src/assets/snacks.png",
      },
    ],
  }),
  methods: {
    showCategoryName(categoryName) {
      this.$emit("clicked-show-category-name", categoryName);
    },
  },
};
</script>