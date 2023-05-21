<template>
    <div>
        <v-col class="py-0">
            <p class="text-h6 fw-600 text-it pt-3">รายละเอียดอาหาร</p>
            <v-text-field :counter="45" v-model="state.description"
                @input="v$.description.$touch(); updateMenuSchema(state.description, v$.description.$error) "
                @blur=" v$.description.$touch " :error-messages="v$.description.$errors.map(e => e.$message)" required
                placeholder="เพิ่มรายละเอียดอาหาร" density="compact"></v-text-field>
        </v-col>
        <v-divider></v-divider>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, maxLength } from '@vuelidate/validators'

export default {
    setup() {
        const menuSchema = {
            description: '',
        }
        const state = reactive({
            ...menuSchema,
        })
        const rules = {
            description: {
                maxLength: helpers.withMessage('กรุณากรอกไม่เกิน 45 ตัวอักษร', maxLength(45)),
            },
        }
        const v$ = useVuelidate(rules, state)
        return { state, v$ }
    },
    methods: {
        updateMenuSchema(value, error) {
            const menuSchema = { menu_desc: value }
            if (!error) {
                this.$emit('updateMenuSchema', menuSchema)
            }
        }
    }
}
</script>