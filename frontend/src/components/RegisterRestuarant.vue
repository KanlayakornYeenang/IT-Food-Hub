<script>
 export default {
    data : ()=> ({
     
      Restuarant_name: '',
      Restuarant_Location: '',
      formHasErrors: false,
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
    })
 }

</script>

<template >
    <v-card
    class="overflow-auto d-flex flex-column"
    style="width: 35rem; height: 50rem"
    rounded="xl"
    >
    <!-- Header -->
        <v-sheet class="header text-center w-100" rounded="xl">
        <p class="ma-5" style="font-weight: 700">Form Register</p>
        <v-divider></v-divider>
        </v-sheet>
        <v-sheet    class="d-flex justify-center flex-column mt-10 ml-10 mr-10" width="">
            <v-form fast-fail @submit.prevent >
                <v-text-field
                    class="justify-center align-center "
                    v-model="Restuarant_name"
                    color="primary"
                    label="Restuarant name"
                    variant="underlined"
                    placeholder="Enter your Restuarant "
                    :rules="[rules.required, rules.counter]"
                ></v-text-field>
                <v-text-field
                    v-model="Restuarant_Location"
                    color="primary"
                    label="Restuarant Location"
                    variant="underlined"
                    placeholder="Enter your Restuarant Location "
                    :rules="[rules.required, rules.counter]"
                ></v-text-field>
                <v-file-input
                    prepend-icon="mdi-camera"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Pick an image of your restuarant"
                    label="Your Restuarant image"
                >
                </v-file-input>
                <v-col>
                    <v-btn type="submit" block class="mt-1 mb-4" >Register </v-btn>
                </v-col>
            </v-form>

        </v-sheet>
    </v-card>
</template>

<style>
</style>