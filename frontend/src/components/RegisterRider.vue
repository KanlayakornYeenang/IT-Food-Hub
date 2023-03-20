<script>
 export default {
    data : ()=> ({
      Location: '',
      Phone : '',
      formHasErrors: false,
      isRegistering: false,
      isRegistered : false,
      rules: {
          // requried เช็คว่า value มีมั้ย
          required: value =>  {if(!!value ) return true
            return 'Required.'},
          counter: value => { if (value.length <= 20 && value.length >=5) return true  
              return 'Max 20 characters and Length must be less than 5'}  ,
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        }
    }),
    methods :{
        register(){
            this.isRegistering = true
            
            // ช่วงนี้เราจะ อัพเดท สถานะของcustomer ให้เขามีร้านค้า
            setTimeout(()=>{
                console.log("register success")
                this.isRegistering = false
                this.isRegistered = true
            },1700)
        }

    },
 }

</script>
<script setup>
    import RegisterNoti from './RegisterNoti.vue'
</script>

<template >
    <v-card
    class="overflow-auto d-flex flex-column"
    style="width: 35rem; height: 50rem"
    rounded="xl"
    v-if="isRegistered == false"
    >
    <!-- Header -->
        <v-sheet class="header text-center w-100" rounded="xl">
        <p class="ma-5" style="font-weight: 700">ขับขี่กับเรา ITFOODHUB</p>
        <v-divider></v-divider>
        </v-sheet>
        <v-sheet   
        
         class="d-flex justify-center flex-column mt-10 ml-10 mr-10" 
         v-if="isRegistering == false"
         >
            <v-form fast-fail @submit.prevent >
                <v-text-field
                    class="justify-center align-center "
                    v-model="Location"
                    color="primary"
                    label="Location"
                    variant="underlined"
                    placeholder="Enter your Location "
                    :rules="[rules.required, rules.counter]"
                ></v-text-field>
                <v-text-field
                    v-model="Phone"
                    color="primary"
                    label="Phone"
                    variant="underlined"
                    placeholder="Enter your Phone "
                    :rules="[rules.required, rules.counter]"
                ></v-text-field>
                <v-file-input
                    prepend-icon="mdi-camera"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Pick an image of your "
                    label="Your Profile"
                >
                </v-file-input>
                <v-col>
                    <v-btn type="submit" block class="mt-1 mb-4" 
                    @click="register"
                    >Register </v-btn>
                </v-col>
            </v-form>

        </v-sheet>
        <v-progress-linear
            v-if="isRegistering == true"
            indeterminate
            color="primary"
            class="d-sm- justify-center flex-column" 
        ></v-progress-linear>
    </v-card>
    <RegisterNoti v-if="isRegistered == true"></RegisterNoti>
</template>

<style>
</style>