<template>
    <v-card class="d-flex flex-row-reverse pt-2" style="background-color: #fffaec;">
        <v-col cols="3">
            <v-card-subtitle class="pa-0 d-flex justify-space-between">
                <p>รวมค่าอาหาร</p>
                <p>฿{{ getTotalPrice }}</p>
            </v-card-subtitle>
            <v-card-subtitle class="pa-0 d-flex justify-space-between">
                <p>ค่าจัดส่ง</p>
                <p>฿10</p>
            </v-card-subtitle>
            <div class="d-flex justify-space-between align-center">
                <v-card-subtitle class="pa-0">รวมทั้งหมด</v-card-subtitle>
                <p class="text-h4 fw-600 text-it">฿{{ getTotalPrice + 10 }}</p>
            </div>
        </v-col>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            //
        }
    },
    props: {
        getTotalPrice: {
            type: Number
        }
    },
}
</script>