<template>
    <v-col class="pa-0">
        <v-tabs v-model="tab" bg-color="itlight" color="it" class="rounded-lg" stacked>
            <v-tab value="รวม" class="mx-auto">รวม</v-tab>
            <v-tab value="กำลังรอคนรับรายการ" class="mx-auto"><v-icon class="ma-1"><v-img
                        src="@/assets/hourglass.png"></v-img></v-icon>
                กำลังรอคนรับรายการ</v-tab>
            <v-tab value="กำลังจัดเตรียมอาหาร" class="mx-auto"><v-icon class="ma-1"><v-img
                        src="@/assets/pot.png"></v-img></v-icon>กำลังจัดเตรียมอาหาร</v-tab>
            <v-tab value="กำลังไปจัดส่งอาหาร" class="mx-auto"><v-icon class="ma-1"><v-img
                        src="@/assets/walking.png"></v-img></v-icon>กำลังไปจัดส่งอาหาร</v-tab>
            <v-tab value="จัดส่งเสร็จสิ้น" class="mx-auto"><v-icon class="ma-1"><v-img
                        src="@/assets/complete.png"></v-img></v-icon>จัดส่งเสร็จสิ้น</v-tab>
        </v-tabs>
    </v-col>
</template>

<style>
.v-tab--selected {
    font-weight: 600 !important;
}
</style>
  
<script>
export default {
    data() {
        return {
            tab: null
        }
    }
};
</script>