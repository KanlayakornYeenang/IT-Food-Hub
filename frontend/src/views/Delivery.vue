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
                        v-for="i  in 10" 
                    
                    >
                        <v-card
                            style="border-radius: 30px; height: 13vw ;padding:2vh; background-color:#2255A4;width:25vw; "
                        >
                            <v-card
                            style="border-radius: 30px;  height: 11vw; "
                            >
                                <div>
                                    <div
                                        style="display: flex; justify-content: space-between"
                                    >
                                        <div
                                            style=" height:7vw; width:12vw; margin-top:2vh;padding:0.5"
                                        >
                                            <v-timeline truncate-line="both"
                                            >
                                                <v-timeline-item
                                                    size="small"
                                                >
                                                    <div
                                                        style=" display: block;/* or inline-block */
                                                        text-overflow: ellipsis;
                                                        word-wrap: break-word;
                                                        overflow: hidden;
                                                        max-height: 3.6em;
                                                        line-height: 1.8em;"
                                                     >
                                                        ร้านพี่ช้าง
                                                    </div>
                                                </v-timeline-item>
                                                <v-timeline-item
                                                    size="small"
                                                >
                                                 M22
                                                </v-timeline-item>
                                            </v-timeline>
                                        </div>
                                        <div
                                            style=" height:7vw; width:12vw; padding-top:1vw; border-left: 1px solid #D9D9D9; margin-top:1vh" 
                                        >
                                            <div 
                                            style="display: flex; justify-content: center"
                                            >
                                                <div
                                                >
                                                    <div style="font-weight:bold; font-size:medium; color: #264C87">
                                                        ค่าอาหาร
                                                    </div>
                                                    <div  style="font-size:smaller; padding-bottom:1vh; color: #264C87">
                                                        150 บาท
                                                    </div>
                                                    <div style="font-weight:bold; font-size:medium; color: #264C87">
                                                        จำนวน
                                                    </div>
                                                    <div style="font-size:smaller">
                                                        3รายการ
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div style="display: flex; justify-content:center; padding-top:1vh">
                                        <v-btn
                                            style="background-color: #FE6612; color:white; border-radius:20px; height:2.5vh; align-item:center"
                                        >รับงาน</v-btn>
                                    </div>
                                </div>
                            </v-card>
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
                    <v-btn style="margin:1vh; background-color:#5EC055; color:white"
                        @click="AcceptOrder()"
                    >ตกลง</v-btn>
                </div>
            </v-card>
        </v-overlay>
    </v-main>   
</template>
<script setup>



</script>
<script>
export default {
  data: () => ({
    openDialog : false
  }),
  methods:{
    AcceptOrder(){
        console.log("accepydata")
        this.$router.push("/itfoodhub/order/testDetails");
    }
  }
}

</script>

