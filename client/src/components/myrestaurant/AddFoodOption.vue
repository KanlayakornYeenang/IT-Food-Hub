<template>
    <div class="w-100">
        <v-card class="w-100 pa-5 my-3" v-for="option, option_index in options" :key="option_index">
            <v-row class="align-center">
                <v-col cols="4">
                    <p class="fw-400">ชื่อกลุ่มตัวเลือก</p>
                </v-col>
                <v-col cols="7">
                    <v-text-field placeholder="เช่น เนื้อ..." v-model="option.option_name" hide-details density="compact"
                        variant="outlined"></v-text-field>
                </v-col>
                <v-col class="px-0" cols="1">
                    <v-btn elevation="0" size="x-small" icon @click="removeOption(option_index)">
                        <v-icon size="large">mdi-close</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row v-for="item, item_index in option.items" :key="item_index" class="align-center">
                <v-col cols="4">
                    <p class="fw-400">ตัวเลือก</p>
                </v-col>
                <v-col cols="3" class="pr-0">
                    <v-text-field placeholder="เช่น ไก่..." v-on:input="(event) => handleInput(event, option_index)"
                        v-model="item.item_name" hide-details density="compact" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="2" class="text-center">
                    <p class="fw-400">ราคา</p>
                </v-col>
                <v-col cols="2" class="pl-0">
                    <v-text-field v-model="item.item_price" hide-details density="compact"
                        variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="1" class="pa-0" v-if="item_index != option.items.length - 1">
                    <v-btn @click="removeItem(option_index, item_index)" icon size="x-small" elevation="0"><v-icon
                            size="large">mdi-trash-can-outline</v-icon></v-btn>
                </v-col>
            </v-row>
            <v-row class="d-flex flex-column bg-grey-lighten-4 rounded">
                <v-col>
                    <p class="fw-400">ลูกค้าจำเป็นต้องเลือกตัวเลือกนี้หรือไม่ ?</p>
                    <v-radio-group hide-details>
                        <v-radio value="0">
                            <template v-slot:label><p class="fw-400">ไม่จำเป็น</p></template>
                        </v-radio>
                        <v-radio value="1">
                            <template v-slot:label><p class="fw-400">จำเป็น</p></template>
                        </v-radio>
                    </v-radio-group>
                </v-col>
                <v-divider></v-divider>
                <v-col>
                    <p class="fw-400">ลูกค้าสามารถเลือกตัวเลือกย่อยได้กี่อย่าง ?</p>
                    <v-radio-group hide-details>
                        <v-radio value="0">
                            <template v-slot:label><p class="fw-400">หลายอย่าง</p></template>
                        </v-radio>
                        <v-radio value="1">
                            <template v-slot:label><p class="fw-400">1 อย่าง</p></template>
                        </v-radio>
                    </v-radio-group>
                </v-col>
            </v-row>
        </v-card>
        <v-btn color="foodhub" class="w-100" prepend-icon="mdi-plus" @click="addOption()">เพิ่มตัวเลือกย่อย</v-btn>
    </div>
</template>

<script>
export default {
    data() {
        return {
            options: [],
        }
    },
    methods: {
        addOption() {
            this.options.push({ option_name: null, items: [{ item_name: null, item_price: null }] });
        },
        addItem(index) {
            this.options[index].items.push({ item_name: null, item_price: null })
        },
        removeOption(index) {
            this.options.splice(index, 1);
        },
        handleInput(event, option_index) {
            const last_index_item = this.options[option_index].items.length - 1
            if (this.options[option_index].items[last_index_item].item_name.length > 0) {
                this.addItem(option_index)
            }
        },
        removeItem(option_index, item_index) {
            this.options[option_index].items.splice(item_index, 1);
        }
    },
}
</script>
