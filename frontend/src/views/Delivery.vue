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
                    >
                    <v-col
                        cols="15"
                        xl="3"
                        lg="4"
                        md="6"
                        sm="5"
                        xs="8"
                        v-for="i  in 10" 
                    
                    >
                        <v-card
                            style="border-radius: 20px;"
                        >
                            <div 
                                class="detail-container"
                                style="display: flex; padding: 2vh"
                            >
                                <v-avatar
                                    color="yellow"
                                    size="small"
                                >
                                    <v-icon>mdi-map-marker</v-icon>
                                </v-avatar>
                                <div
                                    style="margin-left: 2vh"
                                >
                                    <div 
                                        style="font-size: small;"
                                    >
                                        Pickup point
                                    </div>
                                    <div
                                        style="font-weight: bold;"
                                    >
                                        IT, project base 3
                                    </div>
                                </div>
                            </div>
                            <div 
                                class="status-detail"
                                style="margin: 1vh; display: flex; justify-content: center"
                            >
                                <div
                                    style="border-right: 1px solid black; padding:1vh"
                                >
                                    3 รายการ
                                </div>
                                <div
                                    style="border-right: 1px solid black; padding:1vh"
                                >
                                    คุณ เกียร์
                                </div>
                                <div
                                style="border-right:; padding:1vh"
                                >
                                200 B
                                </div>
                            </div>
                            <div 
                                style="display: flex; margin: 2vh; justify-content: end"
                            >
                                <v-btn
                                    @click ="this.openDialog = true"
                                    style="background-color: #5EC055; color:white"
                                >ยืนยัน</v-btn>
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

