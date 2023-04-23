<template>
        <v-col cols="8" class="d-flex my-3 mb-6"
            style="border: 1px; background-color:#2255A4; border-radius:10px"

        >
           <div
            style="width:100%"
           >
                <div
                    class="location-container"
                    style="background-color: white; margin:0.5vh; padding:1vh;border-radius:5px"
                    
                >
                    <div
                        class="static-top-header"
                        style="font-size:20px"
                    >
                        <v-icon icon="mdi-map-marker"></v-icon>
                        ที่อยู่ในการจัดส่ง
                    </div>
                    <div
                        class="detail-header"
                        style="margin: 1vh;"
                    >
                        M22
                    </div>
                </div>
                <div>
                    <div
                        style=" padding:1vh; background-color:white; margin:0.5vh; border-radius:5px"
                        class="header"
                    >
                        <v-row>
                            <v-col
                                cols="8"
                            >
                                    สั้งซ์้อสินค้าแล้ว
                            </v-col>
                            <v-col
                                cols="3"
                            >
                                    ราคาต่อหน่วย
                            </v-col>
                            <v-col>
                                    จำนวน
                            </v-col>
                        </v-row>
                    </div>
                    




                    <div
                        v-for="restaurant,i in baskets" :key="i"
                    >
                        <div
                            v-for="menus,i in restaurant"
                        >
                            <div
                                style="margin: 0.5vh; background-color:white; padding: 0.5vh;border-radius:5px"
                            >
                                <v-sheet>
                                    <v-col>
                                        <div
                                            class="mb-4"
                                            style="font-size:17px;font-weight:bold;"
                                        >
                                            {{ menus.rst_name}}
                                        </div>
                                        <v-row v-for="menu, e in menus.menu">
                                            <v-col cols="8">
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
                                                                    {{ menu.menu_name }}
                                                                </div>
                                                                <div>
                                                                    <div 
                                                                        style="display: flex;"
                                                                    >
                                                                      <div v-for="(i, e) in menu.option"
                                                                        style="color: grey; font-size:15px"
                                                                      >
                                                                        <v-col cols="12">
                                                                          <div v-for="test in i">
                                                                            {{ e }} : {{ test }} 
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
                                            <v-col
                                                style=" align-items: center; display: flex; padding-left:4vh;"
                                            >
                                                {{menu.quantity }}
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-sheet>
                            </div>
                        </div>
                    </div>   
                </div>

                <div
                    style="margin: 0.5vh; background-color:white; padding: 1vh;border-radius:5px"
                >
                    <v-row>
                        <v-col cols="3">
                            <div
                                style="padding: 2vh;"
                            >
                                วิธีการชำระเงิน
                            </div>
                        </v-col>
                        <v-col>
                           <v-btn-toggle>
                                <v-btn>
                                    เงินสด
                                </v-btn>
                                <v-btn>
                                    it-foodhubpay
                                </v-btn>
                           </v-btn-toggle>
                        </v-col>
                    </v-row>
                </div>
                <div
                    style="margin: 0.5vh; background-color:white; padding: 1vh; display:flex; justify-content:end;border-radius:5px"
                >
                   <div 
                   >
                        <v-row
                            
                        >
                            <v-col 
                                style=" width:30vh"
                                cols="7"
                            >
                                ยอดรวมสินค้า
                            </v-col>
                            <v-col>
                                ฿200
                            </v-col>
                        </v-row>
                        <v-row
                            
                        >
                            <v-col 
                                style=" width:30vh"
                                cols="7"
                            >
                                ค่าจัดส่ง
                            </v-col>
                            <v-col>
                                ฿10
                            </v-col>
                        </v-row>
                        <v-row
                            
                        >
                            <v-col 
                                style=" width:30vh; color:#2255A4; font-size:20px; display:flex; align-items:center"
                                cols="7"
                            >
                                การชำระเงินทั้งหมด
                            </v-col>
                            <v-col
                                style="color:#2255A4; font-size:30px"
                            >
                                ฿2103
                            </v-col>
                        </v-row>
                   </div>
                </div>
                <div
                    style="margin: 0.5vh; background-color:white; padding: 2vh; display:flex; justify-content:end; border-radius:5px"
                >
                        <v-btn
                            width="200"
                            height="60"
                            variant="tonal"
                            style="background-color: #36C144; color: white"
                        >
                            สั้งซื้อสินค้า
                        </v-btn>

                </div>
           </div>
        </v-col>
</template>
<script>
export default {
  props:['baskets'],
  data() {
    return{
        
    }
  },
  
}
</script>