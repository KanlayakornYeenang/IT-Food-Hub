<template>
    <div>
        <div style="padding-left: 2vh; padding-right: 2vh;">
            <div style="margin-bottom: 6vh; border-bottom: 1px solid grey;">
                <v-col>
                    <div style="font-size: 20px;">
                        เปลี่ยนรหัสผ่าน
                    </div>
                    <div style="font-size: 12px; margin-bottom:1px solid black; font-weight:lighter">
                        กรุณาอย่าเปิดเผยรหัสผ่านแก่คนอื่นๆ เพื่อความปลอดภัยของบัญชีผู้ใช้คุณเอง
                    </div>
                </v-col>
            </div>
            <div style="margin-bottom: 4vh;">
                <div style=" width:70vh">
                    <v-row>
                        <v-col style="display: flex; justify-content: end" cols="4">
                            <span style="color: grey;padding-top:1vh; font-size:20px">รหัสผ่านเก่า</span>
                        </v-col>
                        <v-col>
                            <div style="display: flex;">
                                <v-text-field style="max-width: 34vh;" variant="outlined" v-model="v$.user_Password.$model">
                                </v-text-field>
                                <v-btn style="margin-top:1vh ;" variant="text" @click="overlay = !overlay">
                                    ลืมรหัสผ่าน
                                </v-btn>
                            </div>
                            <template v-if="v$.user_Password.$error">
                                <p style="color: red;" v-if="v$.user_Password.sameAs.$invalid">
                                    รหัสผ่านของท่านไม่ถูกต้อง
                                </p>
                            </template>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col style="display: flex; justify-content: end" cols="4">
                            <span style="color: grey;padding-top:1vh; font-size:20px">รหัสผ่านใหม่</span>
                        </v-col>
                        <v-col>
                            <div>
                                <v-text-field style="max-width: 34vh;" variant="outlined" v-model="v$.new_Password.$model">
                                </v-text-field>
                            </div>
                            <template v-if="v$.new_Password.$error">
                                <p style="color: red;" v-if="v$.new_Password.required.$invalid">
                                    This field is required
                                </p>
                                <p style="color: red;" v-if="v$.new_Password.minLength.$invalid">
                                    รหัสผ่านต้องยาวอย่างน้อย 8 ตัวอักษร
                                </p>
                                <p style="color: red;" v-if="v$.new_Password.complex.$invalid">
                                    รหัสผ่านง่ายเกินไป
                                </p>
                            </template>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col style="display: flex; justify-content: end" cols="4">
                            <span style="color: grey;padding-top:1vh; font-size:20px">ยืนยันรหัสผ่าน</span>
                        </v-col>
                        <v-col>
                            <div>
                                <v-text-field style="max-width: 34vh;" variant="outlined"
                                    v-model="v$.confirm_Password.$model">
                                </v-text-field>
                            </div>
                            <template v-if="v$.confirm_Password.$error">
                                <p style="color: red;" v-if="v$.confirm_Password.sameAs.$invalid">
                                    รหัสผ่านไม่เหมือนกัน
                                </p>
                            </template>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col style="display: flex; justify-content: end" cols="4">
                        </v-col>
                        <v-col>
                            <div>
                                <v-btn variant="outlined" @click="submit">ยืนยัน</v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </div>

            </div>
        </div>
        <v-overlay v-model="overlay" class="d-flex align-center justify-center">
            <div>
                <v-card>
                    <v-card-title>
                        ลืมรหัสผ่าน
                    </v-card-title>
                    <v-card-subtitle>
                        วิธีแก้ไข
                    </v-card-subtitle>
                    <v-card-text>
                        ใจเย็นๆ ค่อยๆหายใจเข้า ผ่านคลายเข้าไว้ ค่อยๆนึกว่ารหัสผ่านของท่านเป็นอย่างไร
                    </v-card-text>
                </v-card>
            </div>
        </v-overlay>
    </div>
</template>

<style></style>

<script>
import axios from "@/plugins/axios";
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs, minLength } from '@vuelidate/validators'
function complexPassword(value) {
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        return false
    }
    return true
}

export default {
    data() {
        return {
            old_Password: this.user.user_password,
            user_Password: '',
            new_Password: '',
            confirm_Password: '',
            overlay: false
        }
    },
    props: {
        user: {
            type: Object
        }
    },
    mounted() {
        console.log(this.user)
    },
    validations() {
        return {
            new_Password: { required: required, minLength: minLength(8), complex: complexPassword },
            confirm_Password: { sameAs: sameAs(this.new_Password), minLength: minLength(8) }, // Matches อันใหม่
            user_Password: { sameAs: sameAs(this.old_Password) }// Matches อันเก่าใน db
        }
    },
    setup() {
        return { v$: useVuelidate() }
    },
    methods: {
        submit() {
            this.v$.$touch();
            if (!this.v$.$invalid) {
                let data = {
                    password: this.new_Password,
                }
            }
        }
    }
};
</script>