<template>
  <div>
    <v-checkbox
      color="it"
      hide-details
      v-for="(item, i) in option"
      :key="i"
      :value="Object.keys(item)[0]"
      v-model="selected"
    >
      <template v-slot:label>
        <p>{{ Object.keys(item)[0] }}</p>
      </template>
      <template v-slot:append>
        <div style="opacity: 0.8" class="d-flex">
          <p v-if="item[Object.keys(item)[0]] != 0">+</p>
          <p>{{ item[Object.keys(item)[0]] }}</p>
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
    option_name: {
      type: String,
    },
    option: {
      type: Object,
    },
  },
  watch: {
    selected() {
      this.$emit("update-checkbox", { [this.option_name]: this.selected });
    },
  },
};
</script>