<template>
    <v-card color="#f7f7f7" rounded="lg">
        <v-card elevation="0" class="mb-2 pa-2">
            <div class="text-right mb-2">
                <v-btn color="transparent" icon @click="handleClose" elevation="0"><v-icon>mdi-close</v-icon></v-btn>
            </div>
            <v-divider></v-divider>
            <v-card-items>
                <v-card-title class="mt-2 text-center">
                    <p class="text-h5 fw-600">เพิ่มเมนู</p>
                </v-card-title>
            </v-card-items>
        </v-card>
        <v-card class="pa-2 overflow-y-auto" color="itlight" style="height:65.5vh">
            <v-card-items>
                <AddImageSection />
                <AddFoodNameSection />
                <AddFoodDetailSection />
                <FoodOptionsSection :categories="categories"/>
            </v-card-items>
        </v-card>
        <v-card elevation="0" class="pa-2 ma-2">
            <v-card-items class="d-flex justify-center">
                <v-btn size="large" class="text-success text-h5 fw-600" elevation="0">ยืนยัน</v-btn>
            </v-card-items>
        </v-card>
    </v-card>
</template>

<script setup>
import AddImageSection from "@/components/myrestaurant/AddImageSection.vue";
import AddFoodNameSection from "@/components/myrestaurant/AddFoodNameSection.vue";
import AddFoodDetailSection from "@/components/myrestaurant/AddFoodDetailSection.vue";
import FoodOptionsSection from "@/components/myrestaurant/FoodOptionsSection.vue";
</script>

<script>
import eventbus from "@/plugins/eventBus";
export default {
    data() {
        return {
        //
        };
    },
    props: {
        categories: {
            type: Object
        }
    },
    methods: {
        handleClose() {
            eventbus.emit('updateButton', 'close')
        }
    },
}
</script>