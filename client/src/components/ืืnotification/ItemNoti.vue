<template>
    <v-list-item
    title="การแจ้งเตือน"
  ></v-list-item>
  <v-divider></v-divider>
  <div v-for="i in saveNoti.slice().reverse()">
    <v-card class="pa-2">
      <v-row>
        <v-col cols="3">
          <v-avatar
          color="grey-darken-3"
          image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-avatar>
        </v-col>
        <v-col>
          <div>

              <div style="font-size: 12px;">หมายเลขการสั้งซื้อ{{i.order_id}}</div>
              <div style="font-size: 12px;color:gray">สถานะอัพเดท {{i.order_status}}</div>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import io from 'socket.io-client';
import axios from "@/plugins/axios";
export default {
    data() {
        return {
            //
            saveNoti: [],
            orderId:'',
            status:'',
            cus_id:'',
            status_text:'',
            new_Noti :[],
        }
    },
    props: {
        user: {
            type: Object
        },
    },
    mounted() {
      axios.get("api/notifyOrder").then((res)=>{
            this.saveNoti = res.data
      })
      this.saveNoti = JSON.parse(localStorage.getItem('noti'))
      // Connect to the socket server
      this.socket = io('http://localhost:4114'); // Replace with your socket server URL
      // Listen for the 'notification_updated' event
      this.socket.on('notification_updated', ({ orderId, status, cus_id }) => {
        if(cus_id == this.user.user_id){
          this.orderId = orderId
          this.status = status
          if (status == 0) {
                  this.status_text = "กำลังรอคนรับรายการ"
          }
          if (status == 1) {
                  this.status_text = "กำลังจัดเตรียมอาหาร"
          }
          if (status == 2) {
                  this.status_text = "กำลังไปจัดส่งอาหาร"
          }
          if (status == 3) {
                  this.status_text = "จัดส่งเรียบร้อย"
          }
          axios.get("api/notifyOrder").then((res)=>{
            this.saveNoti = res.data
            localStorage.setItem("noti", 1);
          })
        }
        const notidetail = {
          'order_id' : this.orderId,
          'order_status' : this.status_text
        }
        this.saveNoti.push(notidetail)
        }
      );
  },
  beforeUnmount() {
    // Disconnect the socket when the component is unmounted
    this.socket.disconnect();
  },
}
</script>