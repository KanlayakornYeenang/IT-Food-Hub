<template>
    <v-card v-if="order" color="it" rounded="lg" elevation="0" class="pa-3">
        <v-card class="pa-5">
            <v-row>
                <v-col class="pa-0">
                    <v-timeline side="end">
                        <v-timeline-item size="x-small" dot-color="it">
                            <div v-for="menu, res in order.rst_name">
                                <p>{{res}}</p>

                            </div>
                        </v-timeline-item>
                        <v-timeline-item size="x-small" dot-color="error">
                            <p>M22</p>
                        </v-timeline-item>
                    </v-timeline>
                </v-col>
                <v-col class="pa-0 d-flex flex-column justify-center align-center text-it">
                    <div>
                        <p class="fw-600">ค่าอาหาร</p>
                        <p>฿{{order.order_total_price}}</p>
                    </div>
                    <div class="py-1"></div>
                    <div>
                        <p class="fw-600">จำนวน</p>
                        <p>{{totalLength}} รายการ</p>
                    </div>
                </v-col>
            </v-row>
    </v-card>
    <v-btn   class="mt-3 w-100" v-if="order.dlv_id == null" @click="submitOrder(order.order_id)" color="foodhub">รับออเดอร์</v-btn>
    <v-btn class="mt-3 w-100"

                v-if="order.dlv_id != null"
                color="foodhub"
                @click="goToYouOrder"
            >
                ไปที่คำสั้งซิ้อของคุณ
            </v-btn>
    <v-overlay
        class="d-flex justify-center align-center"  
        v-model="overlay"
    >
            <v-card >
                <v-card-title class="text-h5">
                    ยืนยันคำสั้งซื้อ
                </v-card-title>
                <v-card-text>หากกดตกลงคุณจะไม่สามารถรับงานอื่นได้อีก จนกว่างานนี้จะสำเร็จ</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="red-darken-1"
                    variant="text"
                    @click="overlay = false"
                >
                    กลับ
                </v-btn>
                <v-btn
                    color="green-darken-1"
                    variant="text"
                    @click="confirmOrder"
                >
                    ยืนยันคำสั้งซื้อ
                </v-btn>
                </v-card-actions>
            </v-card>
    </v-overlay>
</v-card>
</template>
<script>
import axios from "@/plugins/axios.js";
export default {
props: {
    order: {
      type: Object,
    },
  },
  data() {
    return {
      rst : this.order.rst_name,
      overlay :false,
      orderId: null
    };
  },
  methods:{
     submitOrder(order_id){
        console.log(order_id);
        // const res = await axios.put("/acceptOrderDelivery/"+order_id)
        this.overlay = ! this.overlay
        this.orderId = order_id
    },
    async confirmOrder(){
        console.log("/acceptOrderDelivery/"+this.orderId)
        await axios.put("api/acceptOrderDelivery/"+this.orderId)
        .then(res=>{
            this.$router.push("user/myorder")
        })
        .catch(err=>{
            console.log(err)
        }) 
    },
    goToYouOrder(){
        this.$router.push("user/myorder")
    }
  },
  computed: {
    totalLength() {
      let length = 0;
      for (let i = 0; i < Object.keys(this.order.rst_name).length ; i++) {
        length += (Object.values(this.order.rst_name)[i]).length;
      }
      return length;
    },
  },
};
</script>

