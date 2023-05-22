<template>
  <v-sheet class="mx-auto">
    <v-slide-group show-arrows>
      <v-slide-group-item>
        <v-tabs color="it">
          <v-tab @click="updateClick(category.menu_cat)" v-for="category, category_index in categories"
            :key="category_index">{{
              category.menu_cat }}</v-tab>
        </v-tabs>
        <v-btn @click="updateButton(button)" v-for="button,i in buttons" :key="i" class="d-flex h-100" elevation="0">{{ button }}</v-btn>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<style>
.v-tab--selected {
  font-weight: 600 !important;
}
</style>

<script>
import eventbus from "@/plugins/eventBus";
export default {
  props: {
    categories: {
      type: Array
    },
    buttons: {
      type: Array
    }
  },
  methods: {
    updateClick(category) {
      eventbus.emit('updateCategory', category)
    },
    updateButton(button) {
      console.log(button)
      eventbus.emit('updateButton', button)
    }
  },
}
</script>