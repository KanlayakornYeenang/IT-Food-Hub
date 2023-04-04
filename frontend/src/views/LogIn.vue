<template>
  <v-sheet>
    <v-col xl="4" lg="5" md="8" sm="10">
      <v-card
        class="pa-16 elevation-5 d-flex flex-column align-center"
        rounded="xl"
      >
        <v-img
          contain
          width="180"
          src="https://cdn.discordapp.com/attachments/1019966926014910516/1085258301572386928/itfoodhub.png"
        />
        <v-divider class="w-100 ma-7"></v-divider>
        <span class="w-100" v-if="Login">
          <p class="text-center" style="font-weight: 600">
            To continue, log in to IT Food Hub.
          </p>

          <v-btn class="w-100 mt-5" size="large" rounded="pill">
            <v-img
              :width="20"
              aspect-ratio="1"
              src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
            ></v-img>
            <div class="px-2"></div>
            <p>CONTINUE WITH GOOGLE</p>
          </v-btn>

          <div class="w-100 d-flex align-center">
            <v-divider></v-divider>
            <p class="ma-5" style="font-weight: 600">OR</p>
            <v-divider></v-divider>
          </div>
        </span>
        <p class="text-center response" color="danger">{{ this.response }}</p>
        <v-responsive class="w-100" v-if="Login">
          <v-form fast-fail @submit.prevent ref="form">
            <v-text-field
              v-model="email"
              :rules="[rules.required, rules.email]"
              label="email"
            ></v-text-field>
            <v-text-field
              :type="show ? 'text' : 'password'"
              :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="show = !show"
              v-model="password"
              label="password"
              :rules="[rules.required, rules.counter]"
            ></v-text-field>
            <v-btn
              type="submit"
              block
              color="it"
              size="large"
              rounded="pill"
              @click="Loginsubmit"
              >LOG IN</v-btn
            >
            <v-divider class="my-5"></v-divider>
            <p class="text-center" style="font-weight: 600">
              Don't have an account?
            </p>
            <v-btn
              type="submit"
              block
              class="my-5"
              size="large"
              rounded="pill"
              @click="Login = !Login"
              >SIGN UP</v-btn
            >
          </v-form>
        </v-responsive>
        <v-responsive class="w-100" v-if="!Login">
          <p class="text-center" style="font-weight: 600; color:red">
            {{this.emailisExist}}
          </p>
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
            <v-btn
              type="submit"
              block
              class="mt-1 mb-4"
              @click="Login = !Login"
              size="large"
              rounded="pill"
              >ALREADY HAVE ACCOUNT</v-btn
            >
            <v-btn
              type="submit"
              block
              class="mt-1 mb-4"
              size="large"
              rounded="pill"
              @click ="register"
              >Register</v-btn
            >
          </v-form>
        </v-responsive>
      </v-card>
    </v-col>
  </v-sheet>
  <v-overlay
      v-model="showRegister"
      class="d-flex justify-center align-center"
    >
    <v-card
      color="green"
      >
      <v-card-text>
        Register successfully
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
    </v-overlay>
</template>

<style scoped>
.v-sheet {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2255a4;
  background-image: url("/src/assets/bannerpattern3.png");
  background-position: center;
}
@media only screen and (max-width: 599px) {
  .v-card {
    padding: 2rem 1rem !important;
  }
}
</style>

<script>
import axios from "axios";
import { toHandlers } from "vue";
export default {
  data: () => ({
    valid: true,
    Login: true,
    firstName: "",
    lastName: "",
    email: "",
    formHasErrors: false,
    password: "",
    response: "",
    userDetail: {},
    emailisExist: "",
    showRegister: false,
    show: false,
    rules: {
      // requried เช็คว่า value มีมั้ย
      required: (value) => {
        if (!!value) return true;
        return "Required.";
      },
      counter: (value) => {
        if (value.length <= 20 && value.length >= 5) return true;
        return "Max 20 characters and Length must be less than 5";
      },
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),
  computed: {
    form() {
      return {
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        email: this.email,
      };
    },
  },
  methods: {
    //LOGIN
    async Loginsubmit() {
      const loginDetails = {
        email: this.email,
        password: this.password,
      };
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.response = "";
        console.log(loginDetails);
        axios.post("http://localhost:5000/api/login", loginDetails).then(
          (res) => {
            // ถ้า login ผ่าน
            if (res.data) {
              console.log(res.data);
              this.userDetail = res.data;
              window.localStorage.setItem("access_token", res.data.accessToken);
              window.localStorage.setItem(
                "refresh_token",
                res.data.refreshToken
              );
              this.$router.push("/itfoodhub")
            }
          },
          (res) => {
            // ถ้าlog in ไม่ถูกต้องจะขึ้นแบบนี้
            if (res.response.data != undefined) {
              console.log(res.response.data);
              this.response = res.response.data;
            }
          }
        );
      }
    },
    async register(){
      const { valid } = await this.$refs.form.validate();
      if(valid){
        const registerDetails = ({
          firstName : this.firstName,
          lastName : this.lastName,
          email : this.email,
          password : this.password
        })
        axios.post("http://localhost:5000/api/register", registerDetails)
        .then(
          (res)=>{
            console.log(res.data)
            this.showRegister = true
            setTimeout(()=>{
              this.$router.go(this.$router.currentRoute)
            }, 2000)
          },
          (res)=>{
            console.log("res",res.response.data);
            this.emailisExist = res.response.data
          }
        )
      }

    }
  },
};
</script> 