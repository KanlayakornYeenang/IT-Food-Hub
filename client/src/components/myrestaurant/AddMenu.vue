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
        <v-card class="pa-2 overflow-y-auto" elevation="0" style="height:63.5vh">
            <v-card-items>
                <AddImageSection @updateMenuSchema="updateMenuSchema"/>
                <AddFoodNameSection @updateMenuSchema="updateMenuSchema"/>
                <AddFoodDescriptionSection @updateMenuSchema="updateMenuSchema"/>
                <FoodOptionsSection :categories="categories" @updateMenuSchema="updateMenuSchema"/>
            </v-card-items>
        </v-card>
        <v-card elevation="0" class="pa-2 ma-2">
            <v-card-items class="d-flex justify-center">
                <v-btn size="large" class="text-success text-h5 fw-600" elevation="0" @click="createMenu">ยืนยัน</v-btn>
            </v-card-items>
        </v-card>
    </v-card>
</template>

<script setup>
import AddImageSection from "@/components/myrestaurant/AddImageSection.vue";
import AddFoodNameSection from "@/components/myrestaurant/AddFoodNameSection.vue";
import AddFoodDescriptionSection from "@/components/myrestaurant/AddFoodDescriptionSection.vue";
import FoodOptionsSection from "@/components/myrestaurant/FoodOptionsSection.vue";
</script>

<script>
import eventbus from "@/plugins/eventBus";
import axios from "@/plugins/axios";

export default {
    data() {
        return {
            menuSchema: { menu_name: null, menu_desc: null, menu_cat: null, options: [], menu_price: null, file:null }
        };
    },
    props: {
        categories: {
            type: Object
        },
    },
    methods: {
        handleClose() {
            eventbus.emit('updateButton', 'close')
        },
        updateMenuSchema(menuSchema) {
            this.menuSchema = Object.assign(this.menuSchema, menuSchema)
        },
        createMenu() {
            let formData = new FormData();
                formData.append("menu_name", this.menuSchema.menu_name);
                formData.append("menu_desc", this.menuSchema.menu_desc);
                formData.append("menu_cat", this.menuSchema.menu_cat);
                formData.append("options", this.menuSchema.options);
                formData.append("menu_price", this.menuSchema.menu_price);  
                formData.append("file",this.menuSchema.file);  
                axios.post("partner/createMenu", formData).then(res=>console.log(res)).catch(err=>console.log(err.message))
            this.handleClose()
            axios.post("partner/createMenu", this.menuSchema)
        }
    },
    mounted() {
        eventbus.on('updateMenuSchema', options => {
            this.menuSchema = Object.assign(this.menuSchema, { options: options })
        })
    }
}
</script>