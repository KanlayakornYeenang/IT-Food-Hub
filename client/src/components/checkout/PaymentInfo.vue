<template>
    <v-sheet class="d-flex flex-column pa-1">
        <div class="d-flex align-center">
            <div class="px-1"></div>
            <p class="text-foodhub text-h5">วิธีการชำระเงิน</p>

            <v-btn-toggle mandatory class="ml-10" v-model="toggle" color="blue-darken-4" style="border-radius: 0;">
                <v-btn value="wallet" class="mr-5 rounded" style="border: 1px solid #BDBDBD">IT
                    WALLET</v-btn>
                <v-btn value="cash" class="rounded" style="border: 1px solid #BDBDBD">เงินสด</v-btn>
            </v-btn-toggle>
        </div>
    </v-sheet>
</template>
  
<script>
export default {
    data() {
        return {
            toggle: "wallet",
        };
    },
};
</script>
  