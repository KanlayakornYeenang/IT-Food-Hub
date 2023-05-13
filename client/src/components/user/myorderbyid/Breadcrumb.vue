<template>
    <v-col class="pa-0 mx-auto" cols="11">
        <div class="d-flex justify-space-between py-3">
            <v-breadcrumbs class="py-0 px-2">
                <router-link to="/itfoodhub/user/myorder">
                    <v-breadcrumbs-item class="text-deco text-black">รายการสั่งซื้อของฉัน</v-breadcrumbs-item>
                </router-link>
                <v-breadcrumbs-divider><v-icon icon="mdi-chevron-right"></v-icon></v-breadcrumbs-divider>
                <v-breadcrumbs-item disabled>หมายเลขรายการสั่งซื้อ {{ order.order_id }}</v-breadcrumbs-item>
            </v-breadcrumbs>
            <div v-if="!showButton && order.order_status < 3" class="d-flex align-center px-2">
                <v-btn @click="updateState((parseInt(order.order_status))+1)" color="it">{{ status((parseInt(order.order_status))+1) }}</v-btn>
            </div>
            <div v-else class="d-flex align-center px-2">
                <p class="text-it">{{ status(order.order_status) }}</p>
            </div>
        </div>
    </v-col>
</template>

<script>
import io from 'socket.io-client';

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
        showButton: {
            type: Boolean
        },
    },
    methods: {
        updateState(state) {
            const socket = io('http://localhost:4114');
            socket.emit('update_order_status', { orderId: this.order.order_id, newState: state});
        },
        status(value) {
            if (value == 0) {
                return "กำลังรอคนรับรายการ"
            }
            if (value == 1) {
                return "กำลังจัดเตรียมอาหาร"
            }
            if (value == 2) {
                return "กำลังไปจัดส่งอาหาร"
            }
            if (value == 3) {
                return "จัดส่งเรียบร้อย"
            }
            return undefined
        }
    },
}
</script>

<style scoped>
.text-deco:hover {
    text-decoration: underline;
}
</style>