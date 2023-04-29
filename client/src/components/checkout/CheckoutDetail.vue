<template>
    <v-container fluid class="pa-0" style="background:#F5F5F5;">
        <div class="w-100 container">
            <Header />
            <v-col cols="7" class="d-flex pa-0 rounded-lg mx-auto">
                <v-col class="pa-0">
                    <v-col class="bg-white rounded-lg">
                        <v-col class="pa-2">
                            <div>
                                <DeliveryInfo :user="user" @updateDialog="updateDialog"/>
                                <v-divider class="mb-3"></v-divider>
                                <v-sheet class="pa-3" v-for="restaurant, rst_index in cart" :key="rst_index">
                                    <RestaurantCart :restaurant="restaurant" />
                                </v-sheet>
                            </div>
                        </v-col>
                    </v-col>
                    <v-col class="bg-white mt-5 mb-10 rounded-lg">
                        <v-col class="pa-0">
                            <div>
                                <PaymentInfo />
                                <v-divider class="my-4"></v-divider>
                                <OrderSummary :getTotalPrice="getTotalPrice()" />
                                <v-divider class="my-4"></v-divider>
                                <div class="d-flex flex-row-reverse">
                                    <v-col class="pa-0" cols="3">
                                        <v-btn @click="placeOrder()" class="w-100" size="large"
                                            color="success">สั่งซื้อ</v-btn>
                                    </v-col>
                                </div>
                            </div>
                        </v-col>
                    </v-col>
                </v-col>
            </v-col>
        </div>
    </v-container>
</template>

<script setup>
import Header from "@/components/checkout/Header.vue";
import DeliveryInfo from "@/components/checkout/DeliveryInfo.vue";
import RestaurantCart from "@/components/checkout/RestaurantCart.vue";
import OrderSummary from "@/components/checkout/OrderSummary.vue";
import PaymentInfo from "@/components/checkout/PaymentInfo.vue";
</script>

<script>
import axios from '@/plugins/axios';
// import eventbus from '@/plugins/eventBus';
export default {
    data() {
        return {
            cart: null,
            toggle: "wallet",
            dialog: false
        }
    },
    props: {
        user: {
            type: Object
        }
    },
    methods: {
        placeOrder() {
            const schema = {
                order_total_price: this.getTotalPrice() + 10,
                order_dest: this.user.user_locat,
                cart: this.cart,
            }
            axios.post("api/placeOrder", schema).then((res) => {
                const order_id = res.data.order_id
                this.$router.push("/itfoodhub/orders/"+order_id);
            })
        },
        goBack() {
            // eventbus.emit('update-dialog', true)
            this.$router.go(-1); },
        updateDialog(dialog) {
            this.dialog = dialog
        },
        getTotalPrice() {
            let totalPrice = 0;
            if (this.cart) {
                this.cart.forEach((restaurant) => {
                    restaurant.menu.forEach((menu) => {
                        const price = parseFloat(menu.price);
                        const quantity = menu.quantity;
                        const subtotal = price * quantity;
                        totalPrice += subtotal;
                    });
                });
            }
            return totalPrice
        }
    },
    mounted() {
        axios
            .get('api/cart')
            .then((res) => {
                this.cart = res.data;
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
</script>