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
        <v-card class="pa-2 overflow-y-auto" color="itlight">
            <v-card-items>
                <AddImageSection />
                <AddFoodNameSection />
                <AddFoodDetailSection />
                <FoodOptionsSection :categories="categories"/>
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
            this.$emit("updateAddMenu", false);
        }
    },
    mounted() {
        //
    },
    components: { AddFoodNameSection }
}
</script>