<template>
  <div>FoodHub</div>
</template>

<script>
import axios from "@/plugins/axios.js";

export default {
  data() {
    return {
      //
    };
  },
  mounted() {
    axios
      .get("api/itfoodhub")
      .then((res) => {
        //
      })
      .catch((err) => {
        this.$router.push("/");
      });
  },
};
</script>