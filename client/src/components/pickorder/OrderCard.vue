<template>
    <v-container class="pa-0 h-100">
        <v-card class="h-100 d-flex flex-column">
            <v-card-text :style="{ 'opacity': order.cus_id == user_id ? '0.3' : '1' }">
                <v-timeline density="compact" align="center">
                    <v-timeline-item dot-color="it" size="x-small">
                        <div>
                            <div class="font-weight-normal">
                                <p v-for="rst, rst_name in order.rst_name" :key="rst_name"><v-icon
                                        class="mr-1">mdi-storefront-outline</v-icon>{{ rst_name }}</p>
                            </div>
                        </div>
                    </v-timeline-item>
                    <v-timeline-item dot-color="error" size="x-small">
                        <div>
                            <div class="font-weight-normal">
                                <p><v-icon class="mr-1">mdi-map-marker-outline</v-icon>{{ order.order_dest }}</p>
                            </div>
                        </div>
                    </v-timeline-item>
                </v-timeline>
            </v-card-text>
            <v-card-action class="pa-0">
                <v-btn color="itlight" class="w-100" v-if="order.cus_id == user_id"
                    @click="goToYouOrder(order.order_id)">ไปที่ออเดอร์ของคุณ</v-btn>
                <v-btn class="w-100" color="it" v-if="order.cus_id != user_id"
                    @click="submitOrder(order.order_id)">รับออเดอร์</v-btn>
            </v-card-action>
        </v-card>
        <v-overlay class="d-flex justify-center align-center" v-model="overlay" scroll-strategy="close">
            <v-card>
                <v-card-title class="text-h5">
                    ยืนยันที่จะรับคำสั่งซื้อนี้ ?
                </v-card-title>
                <v-card-text>หากกด <span class="fw-600 text-success">ยืนยัน</span><br>คุณจะไม่สามารถรับคำสั่งซื้ออื่นได้อีก
                    จนกว่างานนี้จะสำเร็จ</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red-darken-1" variant="text" @click="overlay = false">
                        กลับ
                    </v-btn>
                    <v-btn color="green-darken-1" variant="text" @click="confirmOrder">
                        ยืนยัน
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-overlay>
    </v-container>
</template>

<script>
import axios from "@/plugins/axios.js";
import io from 'socket.io-client';

export default {
    props: {
        user_id: {
            type: Number
        },
        order: {
            type: Object,
        },
    },
    data() {
        return {
            rst: this.order.rst_name,
            overlay: false,
            orderId: null,
        };
    },
    methods: {
        submitOrder(order_id) {
            this.overlay = !this.overlay
            this.orderId = order_id
        },
        async confirmOrder() {
            const socket = io('http://localhost:4114');
            await axios.put("api/acceptOrderDelivery/" + this.orderId)
                .then(res => {
                    socket.emit('update_order_status', { orderId: this.order.order_id, newState: 1 });
                    this.$router.push("user/mydelivery")
                })
                .catch((err) => {
                    alert(err.response.data.message)
                })
        },
        goToYouOrder(order_id) {
            this.$router.push("user/myorder/" + order_id)
        }
    },
    computed: {
        totalLength() {
            let length = 0;
            for (let i = 0; i < Object.keys(this.order.rst_name).length; i++) {
                length += (Object.values(this.order.rst_name)[i]).length;
            }
            return length;
        },
    },
};
</script>