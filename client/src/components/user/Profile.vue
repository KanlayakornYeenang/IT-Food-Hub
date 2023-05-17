<template>
    <v-card v-if="user">
        <v-col class="ma-4 mx-5">
            <p class="text-h5">
                ข้อมูลของฉัน
            </p>
            <v-card-subtitle class="pa-0">จัดการข้อมูลส่วนตัวคุณได้ที่นี่</v-card-subtitle>
        </v-col>
        <v-divider class="my-4 ma-8"></v-divider>
        <v-row>
            <v-col class="mt-12 mb-16 pa-0">
                <v-row>
                    <v-col class="text-right text-grey">ชื่อ-นามสกุล</v-col>
                    <v-col class="text-left px-16">{{ user_detail.user_fname }} {{ user_detail.user_lname }}</v-col>
                </v-row>
                <v-row>
                    <v-col class="text-right text-grey">หมายเลขโทรศัพท์</v-col>
                    <v-col class="px-16 d-flex align-center">
                        <p>{{ user_detail.user_phone }}</p>
                        <v-btn class="mx-5 text-red" size="x-small" @click="$router.push('/itfoodhub/user/phone')">เปลี่ยน</v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="text-right text-grey">อีเมลล์</v-col>
                    <v-col class="px-16 d-flex align-center">
                        <p>{{ user_detail.user_email }}</p>
                        <v-btn class="mx-5 text-red" size="x-small" @click="$router.push('/itfoodhub/user/email')">เปลี่ยน</v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="text-right text-grey">รหัสผ่าน</v-col>
                    <v-col class="px-16 d-flex align-center">
                        <p>●●●●●●●●</p>
                        <v-btn class="mx-5 text-red" size="x-small" @click="$router.push('/itfoodhub/user/password')">เปลี่ยน</v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="text-right text-grey"></v-col>
                    <v-col class="text-left px-16"><v-btn color="it">บันทึก{{file_path}}</v-btn></v-col>
                </v-row>
            </v-col>
            <v-col cols="4" class="pa-0 d-flex align-center">
                <v-avatar size="100" color="it"><v-img :src=file_path></v-img></v-avatar>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
        },
    },
    data() {
        return {
            user_detail: this.user,
            file_path: 'http://localhost:5000/static'+ this.user.file_path,
        };
    },

};
</script>