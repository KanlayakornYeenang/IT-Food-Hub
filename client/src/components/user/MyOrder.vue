<template>
      <div class="d-flex justify-center align-center" >
        <v-col class="pa-0" v-if="order">
                <v-col class="bg-white rounded-lg">
                    <v-col class="pa-2">
                        <div>
                            <v-sheet class="d-flex flex-column pa-1">
                                <div class="d-flex align-center text-foodhub"> <v-icon>mdi-map-marker</v-icon>
                                    <div class="px-1"></div>
                                    <p class="text-h5">รายละเอียดในการจัดส่ง</p>
                                </div>
                                <div class="d-flex pa-2 align-center" v-if="user">
                                    <p></p>
                                    <p class="mx-2"></p>
                                    <p></p>
                                    <div class="px-2"></div>
                                </div>
                                <div class="pa-2">
                                    คุณ : {{ order.user_fname }}
                                </div>
                                <div class="pa-2">
                                    ถ้าเหงาให้โทรมา : {{ order.user_phone }}
                                </div>
                                <div class="pa-2">
                                 สถานที่จัดส่ง : {{ order.order_dest }}
                                </div>
                            </v-sheet>
                            <v-divider class="mb-3"></v-divider>
                            <v-sheet>
                                <div class="d-flex align-center "> <v-icon>mdi-moped</v-icon>
                                    <div class="px-1"></div>
                                    <p class="text-h5">สถานะการจัดส่ง</p>
                                </div>
                                <div class="d-flex pa-2 align-center" v-if="user">
                                    <p></p>
                                    <p class="mx-2"></p>
                                    <p></p>
                                    <div class="px-2"></div>
                                </div>
                                <div class="container">
                                    <div class="row">
                                            <div class="col-12 col-md-10 hh-grayBox pt45 pb20">
                                                    <div
                                                        style="display: flex;"
                                                        class="row justify-content-between">
                                                        <div class="order-tracking " :class="[order_status >= 0  ? 'completed': '']">
                                                            <span class="is-complete"></span>
                                                            <p>กำลังรอคนส่งอาหาร<br><span></span></p>
                                                        </div>
                                                        <div class="order-tracking " :class="[ order_status >= 1  ? 'completed': '']">
                                                            <span class="is-complete" ></span>
                                                            <p>กำลังจัดเตรียมอาหาร <br><span></span></p>
                                                        </div>
                                                        <div class="order-tracking " :class="[ order_status >= 2 ? 'completed': '']">
                                                            <span class="is-complete "></span>
                                                            <p>กำลังไปจัดส่งอาหาร<span></span></p>
                                                        </div>
                                                        <div class="order-tracking " :class="[ order_status >= 3 ? 'completed': '']">
                                                            <span class="is-complete "></span>
                                                            <p>จัดส่งเรียบร้อย<br><span></span></p>
                                                        </div>
                                                    </div>
                                            </div>
                                    </div>
                                </div>
                            </v-sheet>
                            <v-divider class="mb-3"></v-divider>
                            <v-sheet class="pa-3" v-for="restaurant, rst_index in order.rst_name" :key="rst_index">
                                <div>
                                    <v-sheet>
                                        <div class="d-flex text-it fw-600 text-h6 pb-3">
                                            <v-icon>mdi-storefront</v-icon>
                                            {{ rst_index }}
                                            <v-hover v-slot="{ isHovering, props }">
                                                <router-link :to="'/itfoodhub/'"
                                                    style="text-decoration: none;">
                                                    <v-card style="cursor: pointer;"
                                                        :class="isHovering ? 'bg-it px-1 mx-1' : 'text-it px-1 mx-1'"
                                                        v-bind="props" elevation="0"><v-tooltip
                                                            activator="parent"
                                                            location="end">ไปยังร้านค้า</v-tooltip></v-card>
                                                </router-link>
                                            </v-hover>
                                        </div>
                                        <div class="d-flex">
                                            <div class="w-100">
                                                <v-col v-for="menu, menu_index in restaurant" :key="menu_index"
                                                    class="pa-0 pb-4 d-flex align-center">
                                                    <v-col cols="1" class="pa-0">
                                                        <v-img
                                                            src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="></v-img>
                                                    </v-col>
                                                    <v-col cols="9">
                                                        <p class="fw-600">{{menu}}</p>
                                                        <v-card-subtitle class="pa-0"></v-card-subtitle>
                                                    </v-col>
                                                    <v-col cols="2" class="d-flex justify-space-between fw-600">
                                                        <p>X</p>
                                                        <p>฿</p>
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

                            <v-divider class="my-4"></v-divider>

                            <v-card class="d-flex flex-row-reverse pt-2" style="background-color: #fffaec;">
                                <v-col cols="3">
                                    <v-card-subtitle class="pa-0 d-flex justify-space-between">
                                        <p>รวมค่าอาหาร</p>
                                        <p>฿</p>
                                    </v-card-subtitle>
                                    <v-card-subtitle class="pa-0 d-flex justify-space-between">
                                        <p>ค่าจัดส่ง</p>
                                        <p>฿10</p>
                                    </v-card-subtitle>
                                    <div class="d-flex justify-space-between align-center">
                                        <v-card-subtitle class="pa-0">รวมทั้งหมด</v-card-subtitle>
                                        <p class="text-h4 fw-600 text-it">฿</p>
                                    </div>
                                </v-col>
                            </v-card>

                            <v-divider class="my-4"></v-divider>

                            <div class="d-flex flex-row-reverse">
                                <v-col v-if="order_status  ==  0 " class="pa-0" cols="3">
                                    <v-btn class="w-100" size="large" color="success" @click="updateState('1')">
                                        กำลังจัดเตรียมอาหาร</v-btn>
                                </v-col>
                                <v-col class="pa-0" cols="3" v-if="order_status  == 1 " >
                                    <v-btn class="w-100" size="large" @click="updateState('2')"
                                        color="success">กำลังไปส่งอาหาร</v-btn>
                                </v-col>
                                <v-col class="pa-0" cols="3" v-if="order_status  == 2 ">
                                    <v-btn class="w-100" size="large" @click="updateState('3')" color="success">
                                        จัดส่งเรียนร้อย</v-btn>
                                </v-col>
                            </div>
                            
                        </div>
                    </v-col>
                </v-col>
            </v-col>
      </div>  
      
</template>
<script>
import io from 'socket.io-client';
import axios from "@/plugins/axios";
export default {
  props:['user'],
  data() {
    return {
      stutepush:null,
      stateshow :[],
      order:null,
      order_Id:'',
      order_status : ''
    }
  },
  methods:{
    updateState(state){
      const socket = io('http://localhost:4114');
      socket.emit('update_order_Status', { orderId: this.order_Id, newState: state});
    },
    async getOrder(){
        try{
            const res = await axios.get("api/myorder");
            this.order =res.data[0]
            this.order_Id  = this.order.order_id
            this.order_status = this.order.order_status
            console.log(this.order)
            console.log(this.order_Id)
        }catch(err){
            console.log(err)
        }
    },
  },
  mounted() {
    const socket = io('http://localhost:4114'); // replace with your backend server URL
    socket.on('order_updated', ({orderId,status_updated}) => {
        if(orderId == this.order_Id){
          console.log('Connected to show_order_status_response!', status_updated);
          this.order_status = status_updated
        }
    });
    this.getOrder()
  }
}
</script>
<style>
.hh-grayBox {
	background-color: #F8F8F8;
	margin-bottom: 20px;
	padding: 35px;
  margin-top: 20px;
}
.pt45{padding-top:45px;}
.order-tracking{
	text-align: center;
	width: 33.33%;
	position: relative;
	display: block;
}
.order-tracking .is-complete{
	display: block;
	position: relative;
	border-radius: 50%;
	height: 30px;
	width: 30px;
	border: 0px solid #AFAFAF;
	background-color: #f7be16;
	margin: 0 auto;
	transition: background 0.25s linear;
	-webkit-transition: background 0.25s linear;
	z-index: 2;
}
.order-tracking .is-complete:after {
	display: block;
	position: absolute;
	content: '';
	height: 14px;
	width: 7px;
	top: -2px;
	bottom: 0;
	left: 5px;
	margin: auto 0;
	border: 0px solid #AFAFAF;
	border-width: 0px 2px 2px 0;
	transform: rotate(45deg);
	opacity: 0;
}
.order-tracking.completed .is-complete{
	border-color: #27aa80;
	border-width: 0px;
	background-color: #27aa80;
}
.order-tracking.completed .is-complete:after {
	border-color: #fff;
	border-width: 0px 3px 3px 0;
	width: 7px;
	left: 11px;
	opacity: 1;
}
.order-tracking p {
	color: #A4A4A4;
	font-size: 16px;
	margin-top: 8px;
	margin-bottom: 0;
	line-height: 20px;
}
.order-tracking p span{font-size: 14px;}
.order-tracking.completed p{color: #000;}
.order-tracking::before {
	content: '';
	display: block;
	height: 3px;
	width: calc(100% - 40px);
	background-color: #f7be16;
	top: 13px;
	position: absolute;
	left: calc(-50% + 20px);
	z-index: 0;
}
.order-tracking:first-child:before{display: none;}
.order-tracking.completed:before{background-color: #27aa80;}

</style>