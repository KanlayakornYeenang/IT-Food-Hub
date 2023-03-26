<template>
    <v-main>
        <v-row
            style="padding-left: 5vh; padding-right: 5vh;"
        >
            <v-col
            class="d-flex flex-column justify-center my-4"
            v-for=" i in 10"
            >
            <CardDelivery></CardDelivery>
            </v-col>
        </v-row>
    
    </v-main>   
</template>
<script setup>
    import CardDelivery from "@/components/CardDelivery.vue";

</script>

