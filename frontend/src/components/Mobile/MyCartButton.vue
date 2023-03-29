<template>
  <div
    class="cart"
  >
    <v-btn rounded="lg" icon="mdi-shopping"></v-btn>
  </div>
</template>

<script>
export default {
  props: {
    isBottomNavActive: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.cart {
  position: fixed;
  right: 0.75rem;
  z-index: 1;
  transition: 0.2s;
  bottom: 4.75rem;
}
</style>