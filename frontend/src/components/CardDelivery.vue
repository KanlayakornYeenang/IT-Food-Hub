<template>
    <v-card width="2    0"
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
                @click = "ConfirmOrder = !ConfirmOrder"
            >
                รับงาน
            </v-btn>
        </v-container>
        </v-card-text>
      </v-card>
      <v-overlay v-model="ConfirmOrder" class="d-flex justify-center align-center">
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
    ConfirmOrder : false
  }),
  
};
</script>