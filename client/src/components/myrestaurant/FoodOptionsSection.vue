<template>
    <v-col class="py-0">
        <div class="pt-3">
            <div class="d-flex align-center py-2">
                <v-col class="d-flex pa-0" cols="4">
                    <p class="text-h6 fw-600 text-it">หมวดหมู่อาหาร <span class="text-red">*</span></p>
                </v-col>
                <v-col class="d-flex pa-0">
                    <v-select v-if="categories" hide-details density="compact"
                        :items="categories.map(item => item.menu_cat)" variant="solo">
                        <template v-slot:label>
                            <p class="text-grey fw-400">เลือกหมวดหมู่</p>
                        </template>
                    </v-select>
                </v-col>
            </div>
            <div class="d-flex align-center py-2 mb-3">
                <v-col class="d-flex pa-0" cols="4">
                    <p class="text-h6 fw-600 text-it">กลุ่มตัวเลือกสินค้า</p>
                </v-col>
                <v-col class="d-flex pa-0">
                    <AddFoodOption />
                </v-col>
            </div>
            <v-divider></v-divider>
            <div class="d-flex align-center py-2 my-3">
                <v-col class="d-flex pa-0" cols="4">
                    <p class="text-h6 fw-600 text-it">ราคา <span class="text-red">*</span></p>
                </v-col>
                <v-col class="d-flex pa-0">
                    <v-text-field placeholder="ระบุราคา" hide-details density="compact" variant="solo"></v-text-field>
                </v-col>
            </div>
        </div>
    </v-col>
</template>

<script setup>
import AddFoodOption from "@/components/myrestaurant/AddFoodOption.vue";
</script>

<script>
export default {
    props: {
        categories: {
            type: Object
        }
    }
}
</script>