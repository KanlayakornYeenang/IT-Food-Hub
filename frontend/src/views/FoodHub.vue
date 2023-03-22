<template>
    <v-main>
        <div class="pa-12 ">
            <HeaderSearchBar ></HeaderSearchBar>
            <HomeBanner></HomeBanner>
            <HomeCategories></HomeCategories>
            <HomeRestaurantList></HomeRestaurantList>
        </div>
    </v-main>
</template>
<script setup>
    import HeaderSearchBar from "@/components/HeaderSearchBar.vue";
    import HomeBanner from "@/components/HomeBanner.vue";
    import HomeCategories from "@/components/HomeCategories.vue";
    import HomeRestaurantList from "@/layouts/default/HomeRestaurantList.vue";
</script>
<script>
    export default {
     data: ()=>({
       refresh_token: '',
       access_token : '',
       nameUser: '',
       userDetail : ''
     }),
    }
</script>