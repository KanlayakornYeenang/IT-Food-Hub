<template>
  <div>
    <v-checkbox
      color="it"
      hide-details
      v-for="(item, i) in option"
      :key="i"
      :value="{ 'item_id': item.item_id, 'item_price' : item.item_price }"
      v-model="selected"
    >
      <template v-slot:label>
        <p>{{ item.item_name }}</p>
      </template>
      <template v-slot:append>
        <div style="opacity: 0.8" class="d-flex">
          <p v-if="item.item_price != 0">+</p>
          <p>{{ parseFloat(item.item_price) }}</p>
        </div>
      </template>
    </v-checkbox>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: [],
    };
  },
  props: {
    option_id: {
      type: Number,
    },
    option: {
      type: Object,
    },
  },
  watch: {
    selected() {
      this.$emit("update-checkbox", { [this.option_id]: this.selected });
    },
  },
};
</script>