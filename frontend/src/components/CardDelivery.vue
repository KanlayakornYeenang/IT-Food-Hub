<template>
    <v-card width="300"
        style="borderRadius:25px"
    >
        <v-img
          height="100"
          src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
          cover
          class="text-white"
        >
        </v-img>
        <v-card-text>
          <div class="font-weight-bold ms-1 mb-2">
            Today
          </div>
          <v-timeline density="compact" align="start">
                <v-timeline-item
                dot-color="red"
                size="x-small"
                >
                    <div class="mb-4">
                            <div class="font-weight-normal">
                                <strong>You : </strong>Delivery name
                            </div>
                            <div>test</div>
                    </div>
                </v-timeline-item>
                <v-timeline-item
                dot-color="blue"
                size="x-small"
                >
                    <div class="mb-4">
                        <div class="font-weight-normal">
                            <strong>Restaurant : </strong>ร้านพี่ช้าง
                        </div>
                        <div></div>
                    </div>
                </v-timeline-item>
                <v-timeline-item

                dot-color="green"
                size="x-small"
                >
                    <div class="mb-4">
                        <div class="font-weight-normal">
                            <strong>To : </strong>Customer name
                        </div>
                        <div></div>
                    </div>
                </v-timeline-item>
          </v-timeline>
          <v-container
            class="text-end"
          >
            <v-btn
                prepend-icon="mdi-check-circle"
                @click = "confirmOrder"
            >
                รับงาน
            </v-btn>
        </v-container>
        </v-card-text>
      </v-card>
        <v-overlay v-model="ConfirmOrder" class="d-flex justify-center align-center">
                <v-sheet
                  elevation="12"
                  max-width="600"
                  rounded="lg"
                  width="100%"
                  class="pa-4 text-center mx-auto"
                >
                    <v-icon
                        class="mb-5"
                        color="success"
                        icon="mdi-check-circle"
                        size="112"
                    ></v-icon>
                
                    <h2 class="text-h5 mb-6">คุณได้รับงานเรียบร้อยแล้ว </h2>
                
                    <p class="mb-4 text-medium-emphasis text-body-2">
                            คุณจะไม่สามารถรับงานอื่นได้จนกว่างานในปัจจุบันจะเสร็จสิ้น
                
                        <br>
                    </p>
                
                    <v-divider class="mb-4"></v-divider>
                    <v-progress-linear
                        v-if="isLoading == true"
                        indeterminate
                        color="primary"
                        class="d-sm- justify-center flex-column" 
                    >
                    </v-progress-linear>
                </v-sheet>
      </v-overlay>
</template>

<script>
export default {
  data: () => ({
    OrderDetail :{
        "OrderName" :'testOrderName',
        "RestaurantName" : 'testNameRestaurantName',
        "CustomerName" :'testCustomerName',
        "Price" :'testPrice',
        "time" :'testTime'
    },
    ConfirmOrder : false,
    isLoading : false
  }),
  methods:{
    confirmOrder(){
        this.ConfirmOrder = !this.ConfirmOrder
        this.isLoading = true
        setTimeout(() => {
            this.$router.replace('/itfoodhub/order/orderDetails')
        },2000)
    }
  }

 
};
</script>