<template>
    <div class="d-flex justify-center align-center" >
        <div>
            {{ this.stateshow}}
          <v-btn
          @click="updateState('กำลังไปร้านอาหาร')"
          >
              กำลังไปร้านอาหาร
          </v-btn>
          <v-btn
          @click="updateState('ถึงร้านอาหารแล้ว')"
          >
            ถึงร้านอาหารแล้ว
          </v-btn>
          <v-btn
          @click="updateState('ร้านกำลังจัดเตรียมอาหาร')"
          >
              ร้านกำลังจัดเตรียมอาหาร
          </v-btn>
          <v-btn
          @click="updateState(' คนส่งกำลังไปส่ง')"
          >
              คนส่งกำลังไปส่ง
          </v-btn>
        </div>
    </div>
</template>
<script>
import io from 'socket.io-client';
export default {
  data() {
    return {
      stutepush:'',
      stateshow :[],
    }
  },
  methods:{
    updateState(state){
      const socket = io('http://localhost:4114');
      this.statepush = state
      socket.emit('update_order_Status', { orderId: 1, newState: this.statepush});
    }
  },
  mounted() {
    const socket = io('http://localhost:4114'); // replace with your backend server URL
    socket.on('order_updated', ({ update}) => {
        console.log(update)
        console.log('Connected to show_order_status_response!');
        this.stateshow.push(update)
    
    });
  }
}
</script>