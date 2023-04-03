<template>
    <v-main>
      <v-container class="fill-height">
        <v-row justify="center" align="center">
            <v-col class="d-flex justify-center">
              <orderstate></orderstate>
            </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>
<script setup>
  import orderstate from '@/orderState/orderstate.vue';

</script>
  
  <script>
  import axios from 'axios';
  export default {
    data: () => ({
      usl: ''
     
    }),
    props: {
      data: {
        type: Array,
      },
    },
    methods: {
      ChageStatus(){
        
      }
    },
  };
  </script>