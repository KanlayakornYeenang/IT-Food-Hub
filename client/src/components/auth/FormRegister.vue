<template>
    <form @submit.prevent="onSubmit">
      <!-- First and Last Name Row -->
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for=""> First Name:</label>
            <v-text-field class="form-control" placeholder="Enter first name" type="text" v-model="v$.form.firstName.$model"/>
            <div class="pre-icon os-icon os-icon-user-male-circle"></div>
            <!-- Error Message -->
            <div class="input-errors" v-for="(error, index) of v$.form.firstName.$errors" :key="index">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
        </div>
  
        <div class="col-sm-6">
          <div class="form-group">
            <label for="">Last Name:</label><v-text-field  class="form-control" placeholder="Enter last name" type="text" v-model="v$.form.lastName.$model"/>
            <!-- Error Message -->
            <div class="input-errors" v-for="(error, index) of v$.form.lastName.$errors" :key="index">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
        </div>
      </div>

  
      <!-- Email Row -->
      <div class="form-group">
        <label for=""> Email address</label><v-text-field  class="form-control" placeholder="Enter email" type="email" v-model="v$.form.email.$model"/>
        <div class="pre-icon os-icon os-icon-email-2-at2"></div>
        <!-- Error Message -->
          <div class="input-errors" v-for="(error, index) of v$.form.email.$errors" :key="index">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
      </div>
  
  
      <!-- Password and Confirm Password Row -->
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for=""> Password</label><v-text-field  class="form-control" placeholder="Password" type="password" v-model="v$.form.password.$model"/>
            <div class="pre-icon os-icon os-icon-fingerprint"></div>
            <!-- Error Message -->
            <div class="input-errors" v-for="(error, index) of v$.form.password.$errors" :key="index">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
        </div>
  
        <div class="col-sm-6">
          <div class="form-group">
            <label for="">Confirm Password</label><v-text-field   class="form-control" placeholder="Confirm Password" type="password" v-model="v$.form.confirmPassword.$model"/>
            <!-- Error Message -->
            <div class="input-errors" v-for="(error, index) of v$.form.confirmPassword.$errors" :key="index">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Submit Button -->
      <div>
        <v-btn class="btn btn-primary" :disabled="v$.form.$invalid" style="margin-left:120px">Signup</v-btn>
      </div>
      
    </form>
  </template>
  <script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'

export function validName(name) {
  let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
  if (validNamePattern.test(name)){
    return true;
  }
  return false;
}
export default {
    

  setup () {
    return { v$: useVuelidate() }
  },

  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }
    }
  },
  validations() {
    return {
      form: {
        firstName: { 
          required, name_validation: {
            $validator: validName,
            $message: 'Invalid Name. Valid name only contain letters, dashes (-) and spaces'
          } 
        },
        lastName: { 
          required, name_validation: {
            $validator: validName,
            $message: 'Invalid Name. Valid name only contain letters, dashes (-) and spaces'
          } 
        },
        email: { required, email },
        password: { required, min: minLength(6) },
        confirmPassword: { required }
      },
    }
}
}
  </script>
  