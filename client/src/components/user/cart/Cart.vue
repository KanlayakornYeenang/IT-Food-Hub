<template>
    <div
        style="width: 100%;"
    >
        <v-card-text>
            <v-text-field
            density="compact"
            variant="solo"
            label="ค้นหาคำสั้งซื้อของคุณ"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            ></v-text-field>
        </v-card-text>
    </div>
    <div class="mt-5" 
        style="padding:1vh"
    >
        <div v-for="detail in carts" 
            style="background-color: white; padding: 1vh; margin-bottom :2vh; border-radius:5px; border: 1px solid grey"
        >
                <div
                    class="mb-4"
                >
                    <div style="display: flex; justify-content:space-between">
                        <div>
                            หมายเลขคำสั้งซ์้อ
                            {{detail.order_id }}
                        </div>
                        <div >
                            สถานะ : <span style="color:red">{{ detail.order_status}}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div v-for="menu, name_res in detail.rst_name" class="pa-2" style="border-bottom: 1px solid grey;">
                        <div
                            class="mb-4"
                            style="font-size: 20px;"
                        >
                        <v-icon icon="mdi-store"></v-icon> {{ name_res }}
                        </div>
                        <v-row 
                            class="mb-3"
                        >
                            <v-col cols="2">
                                <v-img :width="120" class="rounded-lg"
                                    src="https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500.jpg">
                                </v-img>
                            </v-col>
                            <v-col
                                cols="10"
                            >
                                <div v-for="name , i in menu" style="display: flex; justify-content:space-between;">
                                    <div>
                                        {{name}}
                                    </div>
                                    <div>
                                        ฿50
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                <div style="display: flex; justify-content:end; margin:1vh; font-weight: bold; font-size:20px">
                <div>
                    รวมรายการสั้งซ์้อ 500
                </div> 
                </div>
                <div style="display: flex; justify-content:end; margin:1vh; font-weight: bold; font-size:20px">
                    <div>
                        <v-btn
                        width="200"
                        height="40"
                        variant="tonal"
                        style="background-color: #36C144; color: white"
                        :to="'/itfoodhub/user/cart/order/'+detail.order_id"
                        >
                            เช็คสถานะการส่ง
                        </v-btn>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "@/plugins/axios";
export default {
props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      carts:[]
    };
  },
  mounted(){
    this.getAllcarts()
  },
  methods: {
   async getAllcarts(){
        try{
            const res = await axios.get("api/getcarts");
            console.log(res);
            this.carts =res.data
        }catch(err){
            console.log(err)
        }
    },
    }
};
</script>