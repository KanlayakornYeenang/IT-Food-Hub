<template>
    <div>
        <v-col class="py-0">
            <p class="text-h6 fw-600 text-it pt-3">ชื่ออาหาร <span class="text-red">*</span></p>
            <v-text-field :counter="20" v-model="state.name" :error-messages="v$.name.$errors.map(e => e.$message)"
                @input="v$.name.$touch(); updateMenuSchema(state.name, v$.name.$error)" @blur="v$.name.$touch" required
                density="compact" placeholder="เพิ่มชื่ออาหาร"></v-text-field>
        </v-col>
        <v-divider></v-divider>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, maxLength } from '@vuelidate/validators'

export default {
    props: {
        menu_name: {
            type: String
        }
    },
    methods: {
        updateMenuSchema(value, error) {
            const menuSchema = { menu_name: value }
            if (!error) {
                this.$emit('updateMenuSchema', menuSchema)
            }
        }
    },
    setup(props) {
        const menuSchema = {
            name: props.menu_name,
        }
        const state = reactive({
            ...menuSchema,
        })
        const rules = {
            name: {
                required: helpers.withMessage('กรุณากรอกชื่ออาหาร', required),
                maxLength: helpers.withMessage('กรุณากรอกไม่เกิน 20 ตัวอักษร', maxLength(20)),
            },
        }
        const v$ = useVuelidate(rules, state)
        return { state, v$ }
    },
}
</script>

<style>
.v-input__details {
    padding: 0.5em 0 !important;
}
</style>
