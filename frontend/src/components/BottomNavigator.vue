<template>
    <v-bottom-navigation>
        <v-btn value="recent"
        >
            <v-icon> mdi-home-outline </v-icon>
            <div style="font-weight: 600">Home</div>
        </v-btn>    
        <v-btn>
            <v-icon> mdi-shopping </v-icon>
            <div style="font-weight: 600">My Cart</div>
            </v-btn>
        <v-btn  value="orders">
            <v-icon> mdi-receipt-text </v-icon>
            <div class="px-2"></div>
            <div style="font-weight: 600">Orders</div>
        </v-btn>
        <v-btn
          class="mb-4"
          value="Restuarant"
        >
          <v-icon> mdi-silverware </v-icon>
          <div class="px-2"></div>
          <div style="font-weight: 600">My Restaurant</div>
        </v-btn>
        <v-btn rounded="pill" value="Delivery"
            to="/itfoodhub/order"
        >

            <v-icon> mdi-moped  </v-icon>
            <div class="px-2"></div>
            <div style="font-weight: 600">Delivery</div>
        </v-btn>

</v-bottom-navigation>
</template>