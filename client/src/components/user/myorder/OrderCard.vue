<template>
    <v-card v-ripple class="hover" rounded="lg" elevation="2">
        <v-col class="d-flex" style="background: #FFF8E1;">
            <v-col class="d-flex align-center justify-space-between">
                <div class="d-flex align-center">
                    <p class="text-it text-h5 fw-600">{{ status }}</p>
                    <div class="d-flex mx-3 text-h6">
                        <v-card-subtitle class="pa-0 align-center d-flex"> #{{ order.order_id }}</v-card-subtitle>
                    </div>
                </div>
            </v-col>
            <v-col class="d-flex justify-end" v-if="delivery_person">
                <div class="d-flex align-center mx-2">
                    <v-avatar size="28" color="info"><v-icon size="x-small">mdi-account</v-icon></v-avatar>
                    <p class="px-3">{{ delivery_person.user_fname + " " + delivery_person.user_lname}}</p>
                </div>
                <div class="d-flex align-center mx-2">
                    <v-avatar size="28" color="itlight"><v-icon size="x-small">mdi-phone</v-icon></v-avatar>
                    <p class="px-3">{{ delivery_person.user_phone }}</p>
                </div>
            </v-col>
        </v-col>
        <v-divider></v-divider>
        <v-col class="d-flex" v-for="rst, rst_index in order_detail" :key="rst_index">
            <v-col class="py-0"><v-icon class="mr-1">mdi-storefront</v-icon>{{ rst.rst_name }}</v-col>
        </v-col>
        <v-divider></v-divider>
        <v-col class="text-success">
            <v-col class="d-flex align-center py-0">
                <v-icon size="large">mdi-cash</v-icon>
            <p class="fw-600 ml-1">฿{{ parseFloat(order.order_total_price) }}</p>
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
        },
        order_detail: {
            type: Object
        },
        delivery_person: {
            type: Object
        }
    },
    computed: {
        status() {
            if (this.order.order_status == 0) {
                return "กำลังรอคนรับคำสั่งซื้อ"
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
            return "ยกเลิกคำสั่งซื้อ"
        }
    },
}
</script>