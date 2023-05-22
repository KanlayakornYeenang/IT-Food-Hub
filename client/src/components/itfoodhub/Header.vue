<template>
  <div>
    <Banner />
    <Category  @categorySelected="handleCategorySelected" />
  </div>
</template>

<script setup>
import Banner from "@/components/itfoodhub/header/Banner.vue";
import Category from "@/components/itfoodhub/header/Category.vue";
</script>
<script>
export default {
  data: () => ({
    tab: null,
  }),
  methods: {
    handleCategorySelected(category) {
      this.$emit('categorySelected2', category);
      // Use the selected category as needed
    }
  }
}
</script>