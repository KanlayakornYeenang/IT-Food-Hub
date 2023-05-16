<template>
    <div class="container mt-6">
        <v-card
        class="mx-auto"
        max-width="344"
        title="สมัครสมาชิก"
    >
        <v-container>
        <v-text-field
            color="primary"
            label="First name"
            variant="underlined"
            v-model="v$.first_name.$model"
        ></v-text-field>
        <template v-if="v$.first_name.$error" >
                <p style="color: red;" v-if="v$.first_name.required.$invalid" >
                    ต้องกรอก
                </p>
                <p style="color: red;" v-if="v$.first_name.minLength.$invalid" >
                    ต้องมีความยาวมากกว่า 4 ตัวอักษร
                </p>
        </template>

        <v-text-field
            color="primary"
            label="Last name"
            variant="underlined"
            v-model="v$.last_name.$model"
        ></v-text-field>
        <template v-if="v$.last_name.$error">
            <p style="color: red;" v-if="v$.last_name.required.$invalid" >
                ต้องกรอก
            </p>
            <p style="color: red;" v-if="v$.last_name.minLength.$invalid" >
                ต้องมีความยาวมากกว่า 4 ตัวอักษร
            </p>
        </template>

        <v-text-field
            color="primary"
            label="Email"
            variant="underlined"
            v-model="v$.email.$model"
        ></v-text-field>
        <template v-if="v$.email.$error">
            <p style="color: red;" v-if="v$.email.email.$invalid" >
                อีเมล์ไม่ถูกต้อง
            </p>
            <p style="color: red;" v-if="v$.email.required.$invalid" >
                ต้องกรอก
            </p>
        </template>

        <v-text-field
            color="primary"
            label="Password"
            placeholder="Enter your password"
            variant="underlined"
            v-model="v$.password.$model"
        ></v-text-field>
        <template v-if="v$.password.$error">
            <p style="color: red;" v-if="v$.password.required.$invalid">
                This field is required
            </p>
            <p style="color: red;" v-if="v$.password.minLength.$invalid">
                รหัสผ่านต้องยาวอย่างน้อย 8 ตัวอักษร
            </p>
            <p style="color: red;" v-if="v$.password.complex.$invalid" >
                รหัสผ่านง่ายเกินไป
            </p>
        </template>
        <v-text-field
            color="primary"
            label="Confirm Password"
            placeholder="Enter your password"
            variant="underlined"
            v-model="v$.confirm_password.$model"
        ></v-text-field>
        <template v-if="v$.confirm_password.$error">
            <p style="color: red;" v-if="v$.confirm_password.sameAs.$invalid">
                รหัสผ่านไม่เหมือนกัน
            </p>
        </template>
        <v-text-field
            color="primary"
            label="Phone"
            placeholder="Enter your Phone"
            variant="underlined"
            v-model="v$.phone.$model"
        ></v-text-field>
        <template v-if="v$.phone.$error">
            <p style="color: red;" v-if="v$.phone.required.$invalid">
                ต้องกรอกเบอร์โทรศัพท์
            </p>
            <p style="color: red;" v-if="v$.phone.mobile">
                เบอร์โทรศัพท์ต้องประกอบไปด้วยตัวเลข 10 ตัวเท่านั้น
            </p>
        </template>
        <v-textarea
            color="primary"
            label="Location"
            placeholder="Enter your Location"
            variant="underlined"
            v-model="v$.location.$model"
        ></v-textarea>
        <template v-if="v$.location.$error">
            <p style="color: red;" >
                ต้องกรอก
            </p>
        </template>

        <v-checkbox
            color="secondary"
            label="I agree to site terms and conditions"
            v-model="v$.check_box.$model"
        ></v-checkbox>
        <template v-if="v$.check_box.$error">
            <p style="color: red;" >
                ยังไม่ได้ยอมรับเงื่อนไข
            </p>
        </template>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="success"
         @click="submit"
        >
            Complete Registration

            <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
        </v-card-actions>
    </v-card>
    </div>
</template>
<script>
import axios from "@/plugins/axios";
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs, minLength } from '@vuelidate/validators'
function complexPassword (value) {
   if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
     return false
   }
   return true
    }
function mobile (value) {
  return !!value.match(/0[0-9]{9}/)
}
export default {
    data() {
        return {
            first_name:'',
            last_name:'',
            email: '',
            password:'',
            confirm_password: '',
            phone: '',
            location: '',
            check_box:'',
            fromRegister: ''
        }
    },
    validations(){
        return {
            first_name: {required: required, minLength: minLength(5)},
            last_name:{required: required, minLength: minLength(5)},
            password:{required: required, complex: complexPassword, minLength: minLength(8)},
            confirm_password: {sameAs: sameAs(this.password), minLength: minLength(8)}, // Matches อันใหม่
            phone:{required: required, mobile: mobile},
            email:{required: required, email: email},
            location:{required:required},
            check_box:{sameAs: sameAs(true)}
            
        }
    },
    setup(){
        return {v$: useVuelidate()}
    },
    methods:{
        submit(){
            this.v$.$touch();
            if(!this.v$.$invalid){
                let data ={
                    first_name : this.first_name,
                    last_name : this.last_name,
                    password: this.password,
                    phone: this.phone,
                    email:this.email,
                    location:this.location
                }
            }
        }
    }
};
</script>