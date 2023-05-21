<template>
    <div class="container mt-6">
        <v-card
        class="mx-auto"
        max-width="500"
        title="เข้าร่วมเป็นพาร์ทเนอร์ร้านอาหารกับเรา"
    >
        <v-container>
        <v-text-field
            color="primary"
            label="ชื่อร้านอาหารของคุณ"
            variant="underlined"
            v-model="v$.rest_name.$model"
        ></v-text-field>
        <template v-if="v$.rest_name.$error" >
                <p style="color: red;" v-if="v$.rest_name.required.$invalid" >
                    ต้องกรอก
                </p>
                <p style="color: red;" v-if="v$.rest_name.minLength.$invalid" >
                    ต้องมีความยาวมากกว่า 4 ตัวอักษร
                </p>
        </template>
        <v-row>
            <v-col>
                <v-text-field
                    color="primary"
                    label="ขื่อ"
                    variant="underlined"
                    v-model="v$.first_name.$model"
                ></v-text-field>
                <template v-if="v$.first_name.$error">
                    <p style="color: red;" v-if="v$.first_name.required.$invalid" >
                        ต้องกรอก
                    </p>
                    <p style="color: red;" v-if="v$.first_name.minLength.$invalid" >
                        ต้องมีความยาวมากกว่า 4 ตัวอักษร
                    </p>
                </template>
            </v-col>
            <v-col>
                <v-text-field
                    color="primary"
                    label="นามสกุล"
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
            </v-col>
        </v-row>
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
        <v-file-input
            accept="image/png, image/jpeg, image/webp"
            label="รูปร้านค้าของท่าน"
            type="file"
            @change="selectImages"
         ></v-file-input>
        <v-checkbox
            color="secondary"
            v-model="v$.check_box1.$model"
        >
            <template v-slot:label>
                <p>เมื่อคลิกลงทะเบียน ข้าพเจ้ายอมรับข้อกำหนดและเงื่อนไขของไอทีฟูดฮับ 
                    หากข้าพเจ้าผิดข้อกำหนดและเงื่อนไขหรือข้อตกลงทางการค้าเพิ่มเติมใด 
                    ข้าพเจ้าตกลงและยอมรับว่าแกร็บมีสิทธิดำเนินการใด ๆ ตามที่ไอทีฟูดฮับ เห็นสมควร 
                    รวมถึงแต่ไม่จำกัดอยู่เพียงปิดระบบของข้าพเจ้า
                </p>
            </template>
        </v-checkbox>
        <template v-if="v$.check_box1.$error">
            <p style="color: red;" >
                ยังไม่ได้ยอมรับเงื่อนไข
            </p>
        </template>
        <v-checkbox
            color="secondary"
            v-model="v$.check_box2.$model"
        >
            <template v-slot:label>
                <p>ร้านค้าเข้าใจและยอมรับว่า ไอทีฟูดฮับ มีสิทธิที่จะไม่เข้าทำสัญญากับร้านค้าใด ๆ
                     ซึ่งแกร็บได้พิจารณาแล้วว่าไม่คุ้มค่าทางธุรกิจต่อไอทีฟูดฮับ หรือเป็นร้านค้าที่มีข้อเรียกร้องหรือข้อพิพาทกับไอทีฟูดฮับ ในเรื่องใด ๆ
                      ซึ่งรวมถึงแต่ไม่จำกัดเพียงกรณีที่มีหนี้ค้างชำระต่อไอทีฟูดฮับ ข้อพิพาทเกี่ยวกับการผิดสัญญา 
                      ละเมิด และอื่น ๆ ซึ่งไอทีฟูดฮับ เห็นว่าส่งผลต่อการดำเนินธุรกิจร่วมกัน
                </p>
            </template>
        </v-checkbox>
        <template v-if="v$.check_box2.$error">
            <p style="color: red;" >
                ยังไม่ได้ยอมรับเงื่อนไข
            </p>
        </template>
        <v-checkbox
            color="secondary"
            v-model="v$.check_box3.$model"
        >
            <template v-slot:label>
                <p>ในการดำเนินการสมัครเข้าร่วมเป็นร้านค้ากับไอทีฟูดฮับ 
                    ข้าพเจ้าตกลงและยินยอมให้แกร็บเก็บรวบรวม ใ
                    ช้และเปิดเผยข้อมูลที่ข้าพเจ้าให้ไว้ในในนามของร้านค้าระหว่างการสมัคร 
                    เพื่อดำเนินการตามที่จำเป็นภายใต้นโยบายส่วนบุคคลของไอทีฟูดฮับที่ข้าพเจ้าได้อ่านและเข้าใจเนื้อหาทั้งหมดแล้ว
                </p>
            </template>
        </v-checkbox>
        <template v-if="v$.check_box3.$error">
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
function mobile (value) {
  return !!value.match(/0[0-9]{9}/)
}
export default {
    data() {
        return {
            rest_name:'',
            first_name:'',
            last_name:'',
            phone: '',
            location: '',
            check_box1:'',
            check_box2:'',
            check_box3:'',
            file_input: '',
            fromRegister: '',
            file:[]
        }
    },
    validations(){
        return {
            rest_name: {required: required, minLength: minLength(5)},
            first_name: {required: required, minLength: minLength(5)},
            last_name:{required: required, minLength: minLength(5)},
            phone:{required: required, mobile: mobile},
            location:{required:required},
            check_box1:{sameAs: sameAs(true)},
            check_box2:{sameAs: sameAs(true)},
            check_box3:{sameAs: sameAs(true)}
            
        }
    },
    setup(){
        return {v$: useVuelidate()}
    },
    methods:{
        selectImages(event) {
        this.file = event.target.files[0];
        },
        submit(){
            this.v$.$touch();
            if(!this.v$.$invalid){
                console.log(this.file)
                let formData = new FormData();
                formData.append("rest_name", this.rest_name);
                formData.append("first_name", this.first_name);
                formData.append("last_name", this.last_name);
                formData.append("phone", this.phone);
                formData.append("location", this.location);  
                formData.append("file",this.file);  
                axios.post("api/registermerchant", formData).then(res=>{
                    this.$router.push('myrestaurant')
                }).catch(err=>{
                    console.log(err.response)
                })
            }
        }
    }
};
</script>