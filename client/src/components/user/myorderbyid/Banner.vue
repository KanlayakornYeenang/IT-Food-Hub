<template>
    <v-card color="amber-lighten-5" rounded="lg" style="height: 210px;" v-if="order"
        class="d-flex justify-center align-center">
        <v-col class="pa-0 text-center">
            <p class="text-it fw-600 text-h3">{{ status(order.order_status) }}</p>
        </v-col>
        <v-col cols="4" class="pa-0">
            <v-img class="mx-auto" :height="190" :src="'/src/assets/status' + order.order_status + '.png'"></v-img>
        </v-col>
    </v-card>
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
    },
    methods: {
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
    mounted() {
        const socket = io('http://localhost:4114'); // replace with your backend server URL
        socket.on('order_updated', ({ orderId, status_updated }) => {
            if (orderId == this.order.order_id) {
                console.log('Connected to show_order_status_response!', status_updated);
                this.order.order_status = status_updated
            }
        });
    }
}
</script>