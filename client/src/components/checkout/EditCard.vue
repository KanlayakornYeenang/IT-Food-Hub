<template>
    <v-card>
        <v-card-title class="pt-5 pl-6">
            <span class="text-h5">แก้ไขข้อมูลการจัดส่ง</span>
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col><v-text-field label="ชื่อ-นามสกุล" variant="outlined"></v-text-field></v-col>
                <v-col><v-text-field label="หมายเลขโทรศัพท์" variant="outlined"></v-text-field></v-col>
            </v-row>
            <v-row>
                <v-col><v-text-field prepend-inner-icon="mdi-map-marker" label="สถานที่จัดส่ง" variant="outlined"></v-text-field></v-col>
            </v-row>
            <v-row>
                <v-col><v-text-field label="หมายเหตุถึงคนส่ง" variant="outlined"></v-text-field></v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <div class="pb-5"><v-btn size="large" class="bg-error" @click="this.$emit('updateDialog', false)">ยกเลิก</v-btn></div>
            <div class="pb-5 px-5"><v-btn size="large" class="bg-success" @click="updateUserInfo()">บันทึก</v-btn></div>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            //
        }
    },
    props: {
        dialog: {
            type: Boolean
        }
    },
    methods: {
        updateUserInfo() {
            this.$emit('updateDialog', false)
        }
    }
}
</script>