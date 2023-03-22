<template>
  <v-container class="pb-12">
    <v-container class="d-flex justify-space-between">
      <div>
        <p class="h1">Hi,{{detail}}</p>
        <p class="ma-0" style="color: #7f7f7f">Welcome to your dashboard!</p>
      </div>
      <div class="search d-flex align-center">
        <div>
          <v-text-field
            class="mt-5 mr-3"
            label="Search IT Food Hub"
            prepend-inner-icon="mdi-magnify"
            variant="solo"
          ></v-text-field>
        </div>
        <div>
          <v-btn icon="mdi-bell-outline"></v-btn>
        </div>
      </div>
    </v-container>
  </v-container>
</template>
<script>
export default{
  data: ()=>({
      refresh_token: '',
      access_token : '',
      nameUser: '',
    }),
    props : ['detail']
  }
</script>

<style>
.search .v-field {
  border-radius: 100px !important;
  width: 25rem;
}
</style>