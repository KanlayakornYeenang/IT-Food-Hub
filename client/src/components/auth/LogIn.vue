<template>
  <v-col>
    <v-sheet color="transparent" class="text-left pa-8">
      <div class="mb-4">
        <div class="d-flex">
          <div>
            <p class="text-h4" style="font-weight:600">สวัสดี</p>
          </div>
          <div class="px-1"></div>
          <div>
            <v-img
              :width="40"
              src="https://em-content.zobj.net/thumbs/120/apple/354/waving-hand_1f44b.png"
            ></v-img>
          </div>
        </div>
        <p class="my-3">ยังไม่มีบัญชี ? <a href="#">สมัครเลย</a></p>
      </div>
      <v-form @submit.prevent="login">
        <div class="mt-8 mb-4">
          <v-text-field
            label="Email"
            variant="outlined"
            v-model="form.email"
          ></v-text-field>
          <v-text-field
            label="Password"
            :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append-inner="show = !show"
            variant="outlined"
            v-model="form.password"
          ></v-text-field>
        </div>
        <v-btn type="submit" elevation="0" color="it" class="w-100"
          >login</v-btn
        >
      </v-form>
    </v-sheet>
  </v-col>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      show: false,
    };
  },
  methods: {
    async login() {
      try {
        const res = await axios.post("api/login", this.form);
        const { token } = res.data;
        await localStorage.setItem("token", token);
        window.location.href = "/itfoodhub";
      } catch (error) {
        //
      }
    },
  },
};
</script>