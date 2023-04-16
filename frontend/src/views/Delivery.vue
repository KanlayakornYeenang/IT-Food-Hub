<template>
    <v-main>
        <v-row 
            style="padding-left: 5vh; padding-right: 5vh;"
        >
            <v-col
            class="d-flex flex-column justify-center my-5"
            cols="15"
            >
                <v-row
                    justify="center"
                    align="center"
                    >
                    <v-col
                    align-self="center"
                    offset="10"
                        cols="12"
                        xl="4"
                        lg="5"
                        md="6"
                        sm="5"
                        xs="8"
                        v-for="order in groupData" 
                    
                    >
                        <v-card
                            style="min-width: 20vh; min-height: 20vh;background-color:#2255A4; border-radius:30px; padding:2vh"
                        > 
                            <div
                                style="min-width: 18vw; min-height: 18vh; background-color:white; border-radius:30px;"
                            >
                                <div
                                    style="padding: 1vh;"
                                >
                                    <v-icon style="margin-right:1vh">mdi-google-maps</v-icon>{{ order.order_destination  }}
                                </div>
                                <div 
                                    class="status-detail"
                                    style="margin: 1vh; display: flex; justify-content: center"
                                >
                                    <div
                                        style="border-right: 1px solid black; padding:1vh"
                                    >
                                        {{ order.food_name.length }} รายการ
                                    </div>
                                    <div
                                        style="border-right: 1px solid black; padding:1vh"
                                    >
                                        คุณ {{ order.customer_fname }}
                                    </div>
                                    <div
                                        style="border-right:; padding:1vh"
                                    >
                                    {{ order.order_total_price }} B
                                    </div>
                                </div>
                                <div 
                                    style="display: flex; margin: 2vh; justify-content: end"
                                >
                                <v-btn
                                    v-if="order.delivery_fname == undefined"
                                    @click ="setOverlayDetail(order.orders_id)"
                                    style="background-color: #5EC055; color:white"
                                >ยืนยัน {{order.delivery_fname}}</v-btn>
                                <v-btn
                                    v-if="order.delivery_fname != undefined"
                                    @click="AcceptOrder(order.orders_id)"
                                    style="background-color: #5EC055; color:white"
                                    >ไปที่ออเดอร์ที่ต้องจัดส่ง</v-btn>
                                </div>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-overlay
            v-model="openDialog"
            class="d-flex justify-center align-center"
            >
            <v-card
                style="padding: 1vh; border-radius: 20px"
            >
                <v-card-text
                    style="color: red;"
                >
                    ถ้าคุณรับ order แล้ว คุณจำเป็นที่จะทำออเดอร์นี้ให้เสร็จถึงจะรับ order อื่นได้
                </v-card-text>
                <div 
                    style="display:flex; justify-content: end"
                >
                    <v-btn  @click="openDialog = false"
                        style="margin:1vh"
                    >ยกเลิก</v-btn>
                    <v-btn 
                        style="margin:1vh; background-color:#5EC055; color:white"
                        @click="AcceptOrder(pathOrder)"
                    >ตกลง</v-btn>
                </div>
            </v-card>
        </v-overlay>
    </v-main>   
</template>
<script setup>

    
</script>
<script>
import axios from 'axios';
export default {
  data: () => ({
    openDialog : false,
    orders: null,
    groupData:null,
    pathOrder: ''
  }),
  methods:{
    AcceptOrder(path){
        this.$router.push("/itfoodhub/order/yourOrderis"+path);
    },
    setOverlayDetail(path){
        this.openDialog = true
        this.pathOrder = path
    }
  },
  beforeCreate() {
    console.log("welcome to orders Page")
    this.refresh_token = localStorage.getItem("refresh_token");
    this.access_token = localStorage.getItem("access_token");
    axios
      .get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: "Bearer " + this.access_token,
        },
      })
      .then(
        (res)=>{
            console.log("order - data :",res.data)
            this.orders = res.data
            console.log("res data = ",this.orders)
            this.groupData = this.orders.reduce((acc, order) => {
            const { orders_id, Customer_Fname, order_destination, order_status, order_total_price, } = order;
            const food_name = [order.food_name];
            const existingOrder = acc.find(o => o.orders_id === orders_id);
            if (existingOrder) {
                existingOrder.food_name.push(order.food_name);
            } else {
                acc.push({ orders_id, customer_fname, food_name, order_destination, order_status, order_total_price,delivery_fname });
            }
            
            return acc;
            }, []);
        console.log("test",this.groupData)
        },
      ).catch((err)=>{
        console.log(err)
      })
  }
}

</script>

