<template>
    <div
    style="padding-left: 2vh; padding-right: 2vh;"
    >
        <div style="margin-bottom: 6vh; border-bottom: 1px solid grey;">
            <v-col>
                <div
                    style="font-size: 20px;"
                >
                    เปลี่ยนอีเมล์ {{ user.user_email }}
                </div>
                <div
                    style="font-size: 12px; margin-bottom:1px solid black; font-weight:lighter"
                >
                    
                </div>
            </v-col>
        </div>
        <div
            style="margin-bottom: 4vh;"
        >
            <div
                style=" width:70vh"
            >
                <v-row>
                    <v-col 
                        style="display: flex; justify-content: end"
                        cols="4">
                            <span
                            style="color: grey;padding-top:1vh; font-size:20px"
                            >อีเมล์ใหม่</span>
                    </v-col>
                    <v-col>
                        <div style="display: flex;">
                            <v-text-field
                            style="max-width: 34vh;"
                            variant="outlined"
                            v-model="v$.email.$model"
                            >
                            </v-text-field>

                        </div>  
                        <template v-if="v$.email.$error">
                            <p style="color: red;" v-if="v$.email.required.$invalid">
                                ต้องกรอกเบอร์โทรศัพท์
                            </p>
                            <p style="color: red;" v-if="v$.email.email">
                                กรอกได้แค่ email เท่านั้น
                            </p>
                        </template>
                    </v-col>
                </v-row>  
                <v-row>
                    <v-col 
                        style="display: flex; justify-content: end"
                        cols="4">
                    </v-col>
                    <v-col>
                        <div>
                            <v-btn
                            variant="outlined"
                            @click="submit"
                            >ยืนยัน</v-btn>
                        </div>  
                    </v-col>
                </v-row>  
        </div>
    </div>
</div>
</template>
<script>
import axios from "@/plugins/axios";
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs, minLength } from '@vuelidate/validators'
function mobile (value) {
  return !!value.match(/0[0-9]{9}/)
}
export default {
    data() {
        return {
            email:''
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
    validations(){
        return {
            email: {
            required: required, 
            email: email
            },
        }
    },
    setup(){
        return {v$: useVuelidate()}
    },
    methods: {
        submit() {
            this.v$.$touch();
            if (!this.v$.$invalid) {
                let data = {
                   email: this.email,
                }
                axios.put("api/updateemail", data).then(res => {
                    console.log(res)
                    this.$router.go() 
                }).catch(err=>{
                    console.log(err)
                })
            }
        }
    }
};
</script>