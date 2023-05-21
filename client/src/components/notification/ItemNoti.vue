<template>
  <div>
    <v-list-item title="การแจ้งเตือน"></v-list-item>
    <v-divider></v-divider>
    <div v-for="i in saveNoti.slice().reverse()" :key="i">
      <v-card class="pa-2" elevation="0">
        <v-row>
          <v-col cols="3">
            <v-avatar color="grey-darken-3"
              image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"></v-avatar>
          </v-col>
          <v-col>
            <div>
              <div style="font-size: 12px;">หมายเลขการสั้งซื้อ{{ i.order_Id }}</div>
              <div style="font-size: 12px;color:gray">สถานะอัพเดท {{ i.message }}</div>
              <div style="font-size :10px; color:blue">{{ i.time_stamp }}</div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </div>
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
      orderId: '',
      status: '',
      cus_id: '',
      status_text: '',
    }
  },
  props: {
    user: {
      type: Object
    },
  },
  mounted() {
    axios.get("api/notifyOrder").then((res) => {
      this.saveNoti = res.data
    })
    // Connect to the socket server
    this.socket = io('http://localhost:4114'); // Replace with your socket server URL
    // Listen for the 'notification_updated' event
    this.socket.on('notification_updated', ({ getNoti, cus_id }) => {
      if (cus_id == this.user.user_id) {
        this.saveNoti = getNoti
        localStorage.setItem('noti', '1')
      }
    }
    );
  },
  beforeUnmount() {
    // Disconnect the socket when the component is unmounted
    this.socket.disconnect();
  },
}
</script>