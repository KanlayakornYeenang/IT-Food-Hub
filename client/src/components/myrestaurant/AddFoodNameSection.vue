<template>
    <div>
        <v-col class="py-0">
            <p class="text-h6 fw-600 text-it pt-3">ชื่ออาหาร <span class="text-red">*</span></p>
            <v-text-field v-model="state.name" :error-messages="v$.name.$errors.map(e => e.$message)"
                @input="v$.name.$touch" @blur="v$.name.$touch" required density="compact" placeholder="เพิ่มชื่ออาหาร"
                variant="outlined"></v-text-field>
        </v-col>
        <v-divider></v-divider>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

export default {
    setup() {
        const initialState = {
            name: '',
        }

        const state = reactive({
            ...initialState,
        })

        const rules = {
            name: {
                required: helpers.withMessage('กรุณากรอกชื่ออาหาร', required)
            },
        }

        const v$ = useVuelidate(rules, state)

        function clear() {
            v$.value.$reset()

            for (const [key, value] of Object.entries(initialState)) {
                state[key] = value
            }
        }

        return { state, clear, v$ }
    },
}
</script>

<style>
.v-input__details {
    padding: 0.5em 0 !important;
}
</style>