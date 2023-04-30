<template>
    <v-btn-toggle mandatory v-model="click" rounded="0" class="d-flex flex-column h-100">
        <router-link to="/itfoodhub/user" style="text-decoration: none;">
            <v-btn class="py-2 my-1 text-body-1 rounded-lg w-100 d-flex justify-space-between" style="width: fit-content;"
                value="บัญชีของฉัน">
                <v-icon class="pr-4">mdi-account-circle</v-icon>
                บัญชีของฉัน
            </v-btn>
        </router-link>
        <router-link to="/itfoodhub/user/myorder" style="text-decoration: none;"> <v-btn
                class="py-2 my-1 text-body-1 rounded-lg w-100 d-flex justify-space-between" style="width: fit-content;"
                value="myorder">
                <v-icon class="pr-4">mdi-receipt-text</v-icon>
                รายการสั่งซื้อของฉัน
            </v-btn></router-link>
        <router-link to="/itfoodhub/user/mydelivery" style="text-decoration: none;"> <v-btn
                class="py-2 my-1 text-body-1 rounded-lg w-100 d-flex justify-space-between" style="width: fit-content;"
                value="mydelivery">
                <v-icon class="pr-4">mdi-pin</v-icon>
                รายการที่ต้องจัดส่ง
            </v-btn></router-link>

    </v-btn-toggle>
</template>

<script>
export default {
    data() {
        return {
            //
        }
    },
    computed: {
        click() {
            if (this.$route.path.split('/').length == 4) {
                return this.$route.path.split('/')[3]
            }
            if (this.$route.path.split('/').length == 5) {
                return undefined
            }
            return "บัญชีของฉัน"
        }
    }
}
</script>