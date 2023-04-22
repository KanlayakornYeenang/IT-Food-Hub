<template>
  <v-checkbox color="it" hide-details
    ><template v-slot:label>
      <p>
        {{ Object.keys(item)[0] }}
      </p>
    </template>
    <template v-slot:append>
      <div style="opacity: 0.8" class="d-flex">
        <p v-if="item[Object.keys(item)[0]] != 0">+</p>
        <p>{{ item[Object.keys(item)[0]] }}</p>
      </div>
    </template></v-checkbox
  >
</template>

<script>
export default {
  data() {
    return {
      //
    };
  },
  props: {
    item: {
      type: Object,
    },
  },
};
</script>