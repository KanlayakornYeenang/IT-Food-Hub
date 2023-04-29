<template>
    <v-container class="pa-0 h-100">
        <v-card class="h-100 d-flex flex-column">
            <v-card-text :style="{'opacity': order.cus_id == user_id ? '0.3' : '1'}">
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
                    @click="goToYouOrder">ไปที่ออเดอร์ของคุณ</v-btn>
                <v-btn class="w-100" color="it" v-if="order.cus_id != user_id"
                    @click="submitOrder(order.order_id)">รับออเดอร์</v-btn>
            </v-card-action>
        </v-card>
        <v-overlay class="d-flex justify-center align-center" v-model="overlay" scroll-strategy="close">
            <v-card>
                <v-card-title class="text-h5">
                    ยืนยันที่จะรับคำสั่งซื้อนี้ ?
                </v-card-title>
                <v-card-text>หากกด <span class="fw-600 text-success">ยืนยัน</span><br>คุณจะไม่สามารถรับคำสั่งซื้ออื่นได้อีก จนกว่างานนี้จะสำเร็จ</v-card-text>
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
            timelineItems: [
                { title: 'Step 1', description: 'This is the first step' },
                { title: 'Step 2', description: 'This is the second step' },
            ],
        };
    },
    methods: {
        submitOrder(order_id) {
            console.log(order_id);
            // const res = await axios.put("/acceptOrderDelivery/"+order_id)
            this.overlay = !this.overlay
            this.orderId = order_id
        },
        async confirmOrder() {
            console.log("/acceptOrderDelivery/" + this.orderId)
            await axios.put("api/acceptOrderDelivery/" + this.orderId)
                .then(res => {
                    this.$router.push("user/myorder")
                })
                .catch(err => {
                    console.log(err)
                })
        },
        goToYouOrder() {
            this.$router.push("user/myorder")
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