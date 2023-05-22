<template>
    <v-col class="py-0">
        <div class="pt-3">
            <div class="d-flex">
                <v-col class="d-flex pa-0 mt-2" cols="4">
                    <p class="text-h6 fw-600 text-it">หมวดหมู่อาหาร <span class="text-red">*</span></p>
                </v-col>
                <v-col class="d-flex pa-0">
                    <!-- <v-combobox v-model="state.category" @input="v$.category.$touch();" @blur=" v$.category.$touch(); "
                        :error-messages="v$.category.$errors.map(e => e.$message)"
                        :items="this.categories.map(item => item.menu_cat)" density="compact">
                        <template v-slot:label>
                            <p class="text-grey fw-400">เลือกหมวดหมู่</p>
                        </template>
                    </v-combobox> -->
                    <v-combobox v-model="category" :items="this.categories.map(item => item.menu_cat)" density="compact">
                        <template v-slot:label>
                            <p class="text-grey fw-400">เลือกหมวดหมู่</p>
                        </template>
                    </v-combobox>
                </v-col>
            </div>
            <div class="d-flex align-center py-2 mb-3">
                <v-col class="d-flex pa-0" cols="4">
                    <p class="text-h6 fw-600 text-it">กลุ่มตัวเลือกสินค้า</p>
                </v-col>
                <v-col class="d-flex pa-0">
                    <AddFoodOptionComponent :options="options"/>
                </v-col>
            </div>
            <v-divider></v-divider>
            <div class="d-flex py-2 my-3">
                <v-col class="d-flex pa-0" cols="4">
                    <p class="text-h6 fw-600 text-it mt-2">ราคา <span class="text-red">*</span></p>
                </v-col>
                <v-col class="d-flex pa-0">
                    <v-text-field v-model="state.price"
                        @input="v$.price.$touch(); updatePrice(state.price, v$.price.$error) " @blur=" v$.price.$touch "
                        :error-messages="v$.price.$errors.map(e => e.$message)" required placeholder="ระบุราคา"
                        density="compact"></v-text-field>
                </v-col>
            </div>
        </div>
    </v-col>
</template>

<script>
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, numeric, between, maxLength } from '@vuelidate/validators'
import AddFoodOption from "@/components/myrestaurant/AddFoodOption.vue";

export default {
    props: {
        categories: {
            type: Object
        },
        menu_cat: {
            type: String
        },
        menu_price: {
            type: Number
        },
        options: {
            type: Array
        }
    },
    components: {
        AddFoodOptionComponent: AddFoodOption
    },
    setup(props) {
        const menuSchema = {
            category: props.menu_cat,
            price: props.menu_price,
        }
        const state = reactive({
            ...menuSchema,
        })
        const rules = {
            category: {
                required: helpers.withMessage('กรุณากรอกหมวดหมู่', required),
                maxLength: helpers.withMessage('กรุณากรอกไม่เกิน 20 ตัวอักษร', maxLength(20)),
            },
            price: {
                required: helpers.withMessage('กรุณากรอกราคา', required),
                numeric: helpers.withMessage('กรุณากรอกราคาให้ถูกต้อง', numeric),
                between: helpers.withMessage('ราคาที่สามารถกรอกได้คือ 0-1000 บาท', between(0, 1000)),
                decimal: helpers.withMessage('กรุณากรอกราคาให้ถูกต้อง', (value) => {
                    if (value !== null && value !== undefined) {
                        const regex = /^-?\d+(\.\d{1,2})?$/;
                        return regex.test(value.toString())
                    }
                    return true
                })
            },
        }
        const v$ = useVuelidate(rules, state)

        return {
            state,
            v$,
        }
    },
    data() {
        return {
            items: null,
            category: this.menu_cat,
        }
    },
    watch: {
        category(newVal) {
            const menuSchema = { menu_cat: newVal }
            this.$emit('updateMenuSchema', menuSchema)
        }
    },
    methods: {
        updatePrice(value, error) {
            const menuSchema = { menu_price: value }
            if (!error) {
                this.$emit('updateMenuSchema', menuSchema)
            }
        }
    },
}
</script>