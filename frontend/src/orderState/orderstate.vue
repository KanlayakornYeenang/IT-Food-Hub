<template>
    <v-card
       style="min-width:30vw; min-height:70vh   ; border-radius:20px; background-color:#EBF2FC; display:flex; flex-direction:column;"
    >
        <v-card
            style="min-width: 30vw; min-height: 8vh; border-top-right-radius: 20px; background-color:white; display:flex; align-items:center; justify-content:center; font-weight: bold"
        >
             สรุปคำสั้งซื้อ
        </v-card>  
        <div
            style="min-width: 30vw; min-height: 6vh; font-size:10px; color:#7F7F7F; padding: 2vh; border-bottom:1px solid #D9D9D9;"        >
            แสดงรายการร้านอาหาร
        </div>
        <div
        style="min-width: 30vw; min-height: 6vh; font-size:12px; background-color:white ;padding: 2vh; border-bottom:1px solid #D9D9D9; margin-bottom:1vh;"
        >
            ร้านอาหาร : พี่ช้าง
        </div>
        <div v-for="i in 5">
            <div
            style="min-width: 30vw; min-height: 6vh; font-size:13px; padding: 2vh; display: flex; justify-content:space-between"
            >
            <div>
               <span
                style="margin-right: 1vh;" 
               >2</span> กะเพรา
            </div>
            <div>
                50
            </div>
            </div>
        </div>
        <div
            style="min-width: 30vw; min-height: 6vh; font-size:10px; color:#7F7F7F; padding: 2vh; border-bottom:1px solid #D9D9D9; border-top:1px solid #D9D9D9;background-color:white ;"
        
        >
            <div>
                หมายเหตุจากลูกค้า
            </div>
            <div
                style="margin: 2vh;"
            >
                tseteqeweqeeweqeweqweqe
            </div>

        </div>
        <div
            style="min-width: 30vw; min-height: 6vh; font-size:13px; color:black; padding: 2vh; border-bottom:1px solid #D9D9D9; border-top:1px solid #D9D9D9"
        
        >
            สถาะนะของออเดอร์ : <span style="color: #36C144; font-weight:bold">กำลังไปร้านอาหาร</span> new status ={{ status }} 
        </div>
        <v-card
            style="min-width: 30vw; min-height: 8vh;background-color:white;  border-top: 1px solid #D9D9D9; margin-top:auto"
         >
          
         <div
            @click="updateStatus"
            style="width: 100%; height: 100%; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:bold; color: #36C144; cursor:pointer"
         >
            ถึงร้านอาหารแล้ว
         </div>
        </v-card>        
    </v-card>
</template>
<script setup>

</script>

<script>
import io from 'socket.io-client';
export default {
  data() {
    return {
      message: '',
      messages: [],
      socket: null,
      status: "pending"
    };
  },
    mounted() {
    console.log("mounted")
    this.socket = io('http://localhost:4114')
    this.socket.on('update_order_Status', ({orderId, newState}) => {
        console.log(`Received update_order_Status event with order ID ${orderId} and new state ${newState}`);
        this.status = newState
    // update component data with new state
    })
    },
    methods: {    
        updateStatus(){
            this.socket.emit('update_order_Status', { orderId: 1, newState: 'test' });  
        }
    },
    beforeCreate() {
    },

};
</script>>