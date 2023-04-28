<template>
    <div class="d-flex justify-center align-center" 
     >
            <v-table 
                style="width: 50%; "
                density="compact"
                class="mt-10 mb-10"
            >
                <thead>
                    <tr>
                        <th class="text-left">
                            ลำดับ
                          </th>
                        <th class="text-left">
                          ชื่อลูกค้า
                        </th>
                        <th class="text-left">
                           สถานที่จัดส่ง
                        </th>
                        <th class="text-left">
                            ร้านอาหาร
                         </th>
                         <th class="text-left">
                            จำนวนของที่ต้องส่ง
                          </th>
                         <th class="text-left">
                            ราคา
                         </th>
                         <th class="text-left">
                         </th>
                      </tr>
                </thead>
                <tbody>
                    <tr
                        style="height: 7vh;"
                        v-for="order in orders"
                    >   
                        <td>
                            {{ order.order_id }}
                        </td>
                        <td>
                             {{ order.cus_id }}
                        </td>
                        <td>
                            {{order.order_dest}}
                        </td>
                        <td>
                            {{order.rst_id}}
                        </td>
                        <td>
                            ยังไม่ได้ทำ
                        </td>
                        <td>
                            {{order.order_total_price}}
                        </td>
                        <td>
                            <v-btn 
                                variant="outlined"
                                @click="submitOrder(order.order_id)"
                            >
                                รับงาน
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
    </div>
</template>
<script>
import axios from "@/plugins/axios.js";
export default {
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
        orders:null
    };
  },
  methods:{
    submitOrder(order_id){
        console.log(order_id)
    }
  },
  mounted() {
    axios
      .get("api/getOrder")
      .then((res) => {
        console.log(res.data)
        this.orders = res.data;
      })
      .catch((err) => {
        this.$router.push("/");
      });
  },
};
</script>   