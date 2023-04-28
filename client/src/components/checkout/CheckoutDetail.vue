<template>
    <v-container fluid class="pa-0" style="background:#F5F5F5;">
        <div class="w-100 container">
            <v-col cols="7" class="pa-0 py-10 mx-auto">
                <v-hover v-slot="{ isHovering, props }">
                    <v-card @click="goBack()" class="pa-1 px-3" elevation="0" style="width:fit-content; cursor: pointer;"
                        v-bind="props" :color="isHovering ? 'it' : 'transparent'">
                        <p><v-icon>mdi-keyboard-backspace</v-icon> Back</p>
                    </v-card>
                </v-hover>
                <p class="text-h3 fw-600">
                    Checkout
                </p>
            </v-col>
            <v-col cols="7" class="d-flex pa-0 rounded-lg mx-auto">
                <v-col class="pa-0">
                    <v-col class="bg-white rounded-lg">
                        <v-col class="pa-2">
                            <div>
                                <v-sheet class="d-flex flex-column pa-1">
                                    <div class="d-flex align-center text-foodhub"> <v-icon>mdi-map-marker</v-icon>
                                        <div class="px-1"></div>
                                        <p class="text-h5">ข้อมูลในการจัดส่ง</p>
                                    </div>
                                    <div class="d-flex pa-2 align-center" v-if="user">
                                        <p>{{ user.user_fname }} {{ user.user_lname }}</p>
                                        <p class="mx-2">{{ user.user_phone }}</p>
                                        <p>{{ user.user_locat }}</p>
                                        <div class="px-2"></div>
                                        <v-btn size="small" class="text-it fw-600">แก้ไข</v-btn>
                                    </div>
                                </v-sheet>
                                <v-divider class="mb-3"></v-divider>
                                <v-sheet class="pa-3" v-for="restaurant, rst_index in cart" :key="rst_index">
                                    <div>
                                        <v-sheet>
                                            <div class="d-flex text-it fw-600 text-h6 pb-3">
                                                <v-icon>mdi-storefront</v-icon>
                                                <v-hover v-slot="{ isHovering, props }">
                                                    <router-link :to="'/itfoodhub/' + restaurant.rst_id"
                                                        style="text-decoration: none;">
                                                        <v-card style="cursor: pointer;"
                                                            :class="isHovering ? 'bg-it px-1 mx-1' : 'text-it px-1 mx-1'"
                                                            v-bind="props" elevation="0">{{ restaurant.rst_name }}<v-tooltip
                                                                activator="parent"
                                                                location="end">ไปยังร้านค้า</v-tooltip></v-card>
                                                    </router-link>
                                                </v-hover>
                                            </div>
                                            <div class="d-flex">
                                                <div class="w-100">
                                                    <v-col v-for="menu, menu_index in restaurant.menu" :key="menu_index"
                                                        class="pa-0 pb-4 d-flex align-center">
                                                        <v-col cols="1" class="pa-0">
                                                            <v-img
                                                                src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="></v-img>
                                                        </v-col>
                                                        <v-col cols="9">
                                                            <p class="fw-600">{{ menu.menu_name }}</p>
                                                            <v-card-subtitle class="pa-0">{{ menu.item }}</v-card-subtitle>
                                                        </v-col>
                                                        <v-col cols="2" class="d-flex justify-space-between fw-600">
                                                            <p>{{ menu.quantity }}X</p>
                                                            <p>฿{{ menu.price * menu.quantity }}</p>
                                                        </v-col>
                                                    </v-col>
                                                </div>
                                            </div>
                                        </v-sheet>
                                    </div>
                                    <v-divider></v-divider>
                                </v-sheet>
                            </div>
                        </v-col>
                    </v-col>
                    <v-col class="bg-white mt-5 mb-10 rounded-lg">
                        <v-col class="pa-0">
                            <div>
                                <v-sheet class="d-flex flex-column pa-1">
                                    <div class="d-flex align-center">
                                        <div class="px-1"></div>
                                        <p class="text-foodhub text-h5">วิธีการชำระเงิน</p>

                                        <v-btn-toggle mandatory class="ml-10" v-model="toggle" color="blue-darken-4"
                                            style="border-radius: 0;">
                                            <v-btn value="wallet" class="mr-5 rounded" style="border: 1px solid #BDBDBD">IT
                                                WALLET</v-btn>
                                            <v-btn value="cash" class="rounded"
                                                style="border: 1px solid #BDBDBD">เงินสด</v-btn>
                                        </v-btn-toggle>
                                    </div>
                                </v-sheet>
                                <v-divider class="my-4"></v-divider>

                                <v-card class="d-flex flex-row-reverse pt-2" style="background-color: #fffaec;">
                                    <v-col cols="3">
                                        <v-card-subtitle class="pa-0 d-flex justify-space-between">
                                            <p>รวมค่าอาหาร</p>
                                            <p>฿{{ getTotalPrice() }}</p>
                                        </v-card-subtitle>
                                        <v-card-subtitle class="pa-0 d-flex justify-space-between">
                                            <p>ค่าจัดส่ง</p>
                                            <p>฿10</p>
                                        </v-card-subtitle>
                                        <div class="d-flex justify-space-between align-center">
                                            <v-card-subtitle class="pa-0">รวมทั้งหมด</v-card-subtitle>
                                            <p class="text-h4 fw-600 text-it">฿{{ getTotalPrice() + 10 }}</p>
                                        </div>
                                    </v-col>
                                </v-card>

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

<script>
import axios from '@/plugins/axios';
// import eventbus from '@/plugins/eventBus';
export default {
    data() {
        return {
            cart: null,
            toggle: "wallet",
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
            this.$router.go(-1);
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