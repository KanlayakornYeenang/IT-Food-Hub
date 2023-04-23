<template>
  <v-radio-group hide-details v-model="selected">
    <v-radio
      color="it"
      v-for="(item, i) in option"
      :key="i"
      :value="Object.keys(item)[0] + ' ' + item[Object.keys(item)[0]]"
      ><template v-slot:label>
        <div class="d-flex w-100 justify-space-between">
          <div>
            <p>
              {{ Object.keys(item)[0] }}
            </p>
          </div>
          <div class="d-flex">
            <p v-if="item[Object.keys(item)[0]] != 0">+</p>
            <p>{{ item[Object.keys(item)[0]] }}</p>
          </div>
        </div></template
      ></v-radio
    >
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
    option_name: {
      type: String,
    },
    option: {
      type: Object,
    },
  },
  watch: {
    selected() {
      this.$emit("update-radio", { [this.option_name]: [this.selected] });
    },
  },
};
</script>