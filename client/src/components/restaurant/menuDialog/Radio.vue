<template>
  <v-radio-group hide-details v-model="selected">
    <v-radio color="it" v-for="(item, i) in option" :key="i"
      :value="{ 'item_id': item.item_id, 'item_price' : item.item_price }"><template v-slot:label>
        <div class="d-flex w-100 justify-space-between">
          <div>
            <p>
              {{ item.item_name }}
            </p>
          </div>
          <div class="d-flex">
            <p v-if="item.item_price != 0">+</p>
            <p>{{ parseFloat(item.item_price) }}</p>
          </div>
        </div>
      </template></v-radio>
  </v-radio-group>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
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
      this.$emit("update-radio", { [this.option_id]: [this.selected] });
    },
  },
};
</script>