<template>
  <v-sheet color="#2255A4">
    <v-card class="pa-8 elevation-5" rounded="xl">
      <v-img contain width="180" src="https://cdn.discordapp.com/attachments/1019966926014910516/1085258301572386928/itfoodhub.png" />
      <p class="text-center ma-5">To continue, log in to IT Food Hub.</p>
      <p class="text-center ma-5 response" color="danger" >{{this.response}}</p>
      <v-responsive width="400px" v-if="Login">
        <v-form fast-fail @submit.prevent ref="form">
          <v-text-field 
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="email"
          
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="password"
            :rules="[rules.required, rules.counter]"
          ></v-text-field>
          <v-col>
              <v-btn type="submit" block class="mt-1 mb-4" @click="Loginsubmit">LOG IN</v-btn>
              <v-btn type="submit" block class="mt-1 mb-4" @click=" Login =!Login" >SIGN UP</v-btn>
          </v-col>
        </v-form>
       </v-responsive>
       <v-responsive width="400px" v-if="!Login"   >
        <v-form fast-fail @submit.prevent ref="form"> 
            <v-text-field
              v-model="firstName"
              color="primary"
              label="First name"
              variant="underlined"
              placeholder="Enter your first name"
              :rules="[rules.required, rules.counter]"
            ></v-text-field>
      
            <v-text-field
              v-model="lastName"
              color="primary"
              label="Last name"
              variant="underlined"
              placeholder="Enter your lastname"
              :rules="[rules.required, rules.counter]"
            ></v-text-field>
    
            <v-text-field
              v-model="email"
              :rules="[rules.required, rules.email]"
              color="primary"
              label="Email"
              placeholder="Enter your email address"
              variant="underlined"
            ></v-text-field>
      
            <v-text-field
              v-model="password"
              color="primary"
              label="Password"
              placeholder="Enter your password"
              variant="underlined"
              :rules="[rules.required, rules.counter]"
            ></v-text-field>
            <v-col>
              <v-btn type="submit" block class="mt-1 mb-4" @click=" Login =!Login">ALREADY HAVE ACCOUNT</v-btn>
              <v-btn type="submit" block class="mt-1 mb-4" @click="Login =!Login" >Register</v-btn>
          </v-col>
        </v-form>
       </v-responsive>
      <v-btn rounded="pill">
        <v-img
          :width="20"
          aspect-ratio="1"
          src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
        ></v-img>
        <div class="px-2"></div>
        <p>CONTINUE WITH GOOGLE</p>
        </v-btn>
    </v-card>
  </v-sheet>
</template>
<script>
  import axios from "axios"
  export default {
    data : ()=> ({
      valid: true,
      Login: true,
      firstName: '',
      lastName :'',
      email: '',
      formHasErrors: false,
      password : '',
      response : '',
      userDetail :{},
      
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
  computed :{
    form () {
        return {
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password,
          email: this.email,
        }
      },
  },
  methods :{
    //LOGIN
    async Loginsubmit () {
      const loginDetails = {
        email: this.email,
        password : this.password
      }
      const { valid } =  await this.$refs.form.validate()
      if(valid){
        this.response =''
        console.log(loginDetails)
        axios.post('http://localhost:5000/api/login', loginDetails)
        .then(
          (res)=>{
            // ถ้า login ผ่าน
            if(res.data)
              {
                console.log(res.data)
                this.userDetail = res.data
                window.localStorage.setItem("access_token", res.data.accessToken)
                window.localStorage.setItem("refresh_token", res.data. refreshToken)
                this.$router.push("/Home")
              }
          },
          (res)=>{
            // ถ้าlog in ไม่ถูกต้องจะขึ้นแบบนี้
            if(res.response.data != undefined ){
              console.log(res.response.data)
              this.response = res.response.data
            }
          }
        )
      }},
  }
}

</script> 
  impoer 

<style scoped>
.v-sheet {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('/src/assets/bannerpattern3.png');
  background-position: center;
}
.response{
  color: red;
}
.v-card {
  width: 30%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
</style>