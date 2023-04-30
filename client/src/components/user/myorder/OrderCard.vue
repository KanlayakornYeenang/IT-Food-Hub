<template>
    <v-card v-ripple class="hover" rounded="lg" elevation="2">
        <v-col class="px-4">
            <v-col class="pa-0 d-flex align-center justify-space-between">
                <div class="d-flex align-center">
                    <p class="text-foodhub text-h4 fw-600">{{ status }}</p>
                    <div class="d-flex align-center mt-1 text-success">
                        <v-icon size="large" class="ml-5">mdi-cash</v-icon>
                        <p class="fw-600">฿{{ parseFloat(order.order_total_price) }}</p>
                    </div>
                </div>
                <v-card-subtitle class="pa-0">หมายเลขรายการสั่งซื้อ {{ order.order_id }}</v-card-subtitle>
            </v-col>
            <v-col class="d-flex pa-0 text-it">
                <div class="px-0 pb-0 d-flex align-center">
                    <v-avatar size="28" color="info"><v-icon size="x-small">mdi-account</v-icon></v-avatar>
                    <p class="px-3">กำลังรอคนรับรายการ</p>
                </div>
                <div class="px-5 pb-0 d-flex align-center">
                    <v-avatar size="28" color="itlight"><v-icon size="x-small">mdi-phone</v-icon></v-avatar>
                    <p class="px-3">กำลังรอคนรับรายการ</p>
                </div>
            </v-col>
        </v-col>
        <v-divider></v-divider>
        <v-col class="pa-0 pb-4">
            <v-col class="d-flex pa-0" v-for="menus, rst_name in order.rst_name" :key="rst_name">
                <v-col cols="2" class="pa-0 px-4 pt-4">
                    <v-img class="rounded-lg"
                        src="https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500.jpg"></v-img>
                </v-col>
                <v-col>
                    <p class="my-5 text-it fw-600 text-h6">{{ rst_name }}</p>
                    <p v-for="menu, menu_index in menus" :key="menu_index">{{ menu }}</p>
                </v-col>
            </v-col>
        </v-col>
    </v-card>
</template>

<style>
.hover:hover {
    background: #FFF8E1;
}
</style>

<script>
export default {
    data() {
        return {
            //
        }
    },
    props: {
        order: {
            type: Object
        }
    },
    computed: {
        status() {
            if (this.order.order_status == 0) {
                return "กำลังรอคนรับรายการ"
            }
            if (this.order.order_status == 1) {
                return "กำลังจัดเตรียมอาหาร"
            }
            if (this.order.order_status == 2) {
                return "กำลังไปจัดส่งอาหาร"
            }
            if (this.order.order_status == 3) {
                return "จัดส่งเรียบร้อย"
            }
            return "ยกเลิกรายการ"
        }
    },
}
</script>