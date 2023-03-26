<template>
    <v-main>
      <v-container class="fill-height">
        <v-row justify="center" align="center">
            <v-col class="d-flex justify-center">
                <v-sheet style="width: 700px; height: 700px">
                  <v-container>
                    <v-row>
                      <v-col class="Headder" cols="6"
                      >
                        <div class="Order "
                        style="margin: 3vh"
                        > 
                          <div 
                          style="margin-bottom:1vh"
                          >
                            <h1>Order id</h1>
                          </div>
                          <div>
                          <strong>Delivey :</strong> Delivery name
                          </div>
                          <div>
                            <strong>ผู้รับอาหาร :</strong> Customer name
                          </div>
                        </div>
                      </v-col >
                        <v-col
                          cols="6"
                        >
                          <div class="Order "
                          style="margin: 3vh"
                          > 
                              <div 
                              style="margin-bottom:1vh"
                              class="text-end"
                              >
                                <h1>Location</h1>
                              </div>
                              <div
                               class="text-end"
                              >
                              <strong>ตึก It :</strong> ห้อง 308
                              </div>

                          </div>
                        </v-col>
                      
                      <v-col
                        cols="12"
                        
                     >
                      <div class="timeline"
                      style="margin: 3vh"
                      >
                        <v-timeline 
                        direction="horizontal"
                        density="compact" 
                        line-inset="-100"
                        >
                          <v-timeline-item
                          >
                            <div
                            style="margin-left:3vh; margin-top: 1vh;"
                            >
                             กำลังเดินทางไปร้านอาหาร
                            </div>
                          </v-timeline-item>
                          
                          <v-timeline-item>
                           <div
                           style="margin-left:3vh; margin-top: 1vh;"
                           >
                              ถึงร้านอาหารแล้ว
                           </div>
                          </v-timeline-item>
                      
                          <v-timeline-item>
                            <div
                            style="margin-left:3vh; margin-top: 1vh;"
                           >
                              กำลังนำอาหารไปส่ง
                           </div>
                          </v-timeline-item>
                          <v-timeline-item>
                            <div
                            style="margin-left:3vh; margin-top: 1vh;"
                           >
                              ส่งเรียบร้อยแล้ว
                           </div>
                          </v-timeline-item>
                        </v-timeline>
                      </div>
                      </v-col>
                      
                      <v-col 
                      >
                        <v-card
                          style="margin-left: 2vh; margin-right: 2vh"
                        >
                          <div>
                            <strong style="margin-bottom: 1vh; padding:1vh">สรุปคำสั้งซื้อ</strong>
                            <v-card>
                              <div 
                          
                              style="display: flex;
                              justify-content: space-between; margin: 1vh;
                              height: 120px;"
                              >
                                <div>1</div>
                                <div>กะเพราหมาสับ</div>
                                <div>50</div>
                              </div>
                              <div 
                              style="display: flex;
                              justify-content: space-between; margin: 1vh;"
                              >
                                <div>ราคาทั้งหมด</div>
                                <div>50</div>
                              </div>
                            </v-card>
                          </div>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                  <div
                          style="margin-top: 5vh; margin-right: 5vh;"
                          class="text-end"
                         >
                            <v-btn
                                prepend-icon="mdi-check-circle"
                                @click = "confirmOrder"
                            >
                               ถึงร้านอาหารแล้ว
                            </v-btn>
                        </div>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
    </v-main>
  </template>
  
  <script setup>
    import TimeLineDeli from '@/components/TimeLineDeli.vue';
  
  </script>
  
  <script>
  import axios from 'axios';
  export default {
    data: () => ({
      usl: ''
     
    }),
    props: {
      data: {
        type: Array,
      },
    },
    methods: {
      ChageStatus(){
        
      }
    },
  };
  </script>