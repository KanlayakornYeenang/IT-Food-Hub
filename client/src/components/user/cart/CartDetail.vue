<template>
    <div 
        style="background-color:#2255A4; padding:1vh;border-radius:10px;"
    >
        <div
            style="background-color:white; margin:1vh; border-radius:5px"
         >
            <v-row>
                <v-col
                    col="2"
                >
                    <div >
                        <v-btn
                        variant="text"
                        prepend-icon="mdi-check-circle"
                        :to="'/itfoodhub/user/cart'"
                        >
                        <template v-slot:prepend>
                            <v-icon icon="mdi-arrow-left" ></v-icon>
                        </template>
                    
                         ย้อนกลับ
                        </v-btn>
                    </div>
                </v-col>
                <v-col
                    cols="3"
                 style=" align-items: center; display: flex; padding-left:2vh;">
                    หมายเลขคำสั้งซื้อ  
                </v-col>
            </v-row>
        </div>
        <div
            style="background-color:white; margin:1vh; border-radius:5px; margin-top: 2vh; padding:2vh;"
        >
            สถานะการจัดส่ง  กำลังจัดส่ง
        </div>  
        <div
            style="background-color:#ECE6E6; margin:1vh; border-radius:5px; margin-top: 1vh; padding:2vh"
        >
            <div 
                class="ma-3"
                style="font-size: 20px;"
            >
                ที่อยู่ในการจัดส่ง
            </div>
            <v-row
                class="ml-1"
            >
                <v-col
                    cols="3"
                    style="border-right: 1px solid grey;"
                >
                    M22
                </v-col>
                <v-col cols="5" style="border-right: 1px solid grey;">
                    <v-icon size="30" style="margin-right: 2vh;" icon="mdi-timer-outline"></v-icon> 
                    05-10-2019 02:32 <span style="font-size: 17px ;color:#2255A4; margin-left:2vh">สั้งซื้อสินค้า</span>
                </v-col>
                <v-col cols="2">
                    คนส่ง
                </v-col>
            </v-row>
        </div> 
        <v-sheet style="padding:2vh; margin:1vh; border-radius:5px">
            <v-col>
                <div
                    class="mb-4"
                    style="font-size:17px;font-weight:bold; display:flex;"
                >
                   <div 
                    style="display: flex; justify-content:center; align-items:center; margin-right:1vh"
                    >
                    <v-icon icon="mdi-store"></v-icon> ร้านเย็ดหี 
                </div>
                   <v-btn
                    variant="outlined"
                    height="24x"
                   style="color:#2255A4;"
                   >
                        ดูร้านค้า
                   </v-btn>
                </div>
                <v-row >
                    <v-col cols="9">
                            <v-row >
                                <v-col cols="2">
                                    <v-img :width="80" class="rounded-lg"
                                        src="https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500.jpg">
                                    </v-img>
                                </v-col>
                                <v-col
                                    style=" align-items: center; display: flex"
                                >
                                     <div>
                                        <div>
                                            dadada
                                        </div>
                                        <div>
                                            <div 
                                                style="display: flex;"
                                            >
                                              <div 
                                                style="color: grey; font-size:15px"
                                              >
                                                <v-col cols="12">
                                                  <div >
                                                        dada
                                                  </div>
                                                </v-col>
                                              </div>
                                            </div>
                                          </div>
                                    </div>
                                </v-col>
                            </v-row>
                    </v-col>
                    <v-col
                        cols="3"
                        style=" align-items: center; display: flex; padding-left:3vh"
                    >
                        
                       200 บาท
                    </v-col>
                </v-row>
            </v-col>
        </v-sheet>
        <div
        style="background-color:#ECE6E6; margin:1vh; border-radius:5px; margin-top: 1vh; padding:2vh"
        >
            <v-row>
                <v-col cols="10">
                    <div style="display:flex; align-items:end; justify-content:end">
                        ราคาอาหาร
                    </div>
                </v-col>
                <v-col>
                    <div style="display:flex; align-items:end; justify-content:end">
                        200
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10">
                    <div style="display:flex; align-items:end; justify-content:end">
                        ค่าจัดส่ง
                    </div>
                </v-col>
                <v-col>
                    <div style="display:flex; align-items:end; justify-content:end">
                        20
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10">
                    <div style="display:flex; align-items:end; justify-content:end">
                        รวมคำสั้งซ์้อ
                    </div>
                </v-col>
                <v-col>
                    <div style="display:flex; align-items:end; justify-content:end; font-size:30px; color:#2255A4">
                        220
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10">
                    <div style="display:flex; align-items:end; justify-content:end">
                        ช่องทางการชำระเงิน
                    </div>
                </v-col>
                <v-col>
                    <div style="display:flex; align-items:end; justify-content:end">
                        ชำระเงินปลายทาง
                    </div>
                </v-col>
            </v-row>
        </div>
    </div>
</template>