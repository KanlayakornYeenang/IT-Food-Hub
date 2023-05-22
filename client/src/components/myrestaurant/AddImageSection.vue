<template>
    <div>
        <v-col>
            <div>
                <p class="text-h6 fw-600 text-it">เพิ่มรูปภาพ</p>
                <div class="py-2">
                    <v-file-input 
                    hide-details prepend-icon="mdi-camera" 
                    @change="updateMenuSchema"
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    updateMe
                    >
                        <template v-slot:label>
                            <p class="fw-400 text-grey">เลือกรูปภาพ</p>
                        </template>
                    </v-file-input>
                </div>
                <p class="text-grey fw-400">*ขนาด 1:1 ขนาดสูงสุด 1 MB
                    นามสกุลไฟล์ที่รองรับ
                    PNG, JPG</p>
            </div>
        </v-col>
        <v-divider></v-divider>
    </div>
</template>

<style>
.img .v-input__control {
    height: 100px !important;
}
</style>
<script>
import axios from "@/plugins/axios";
export default {
    data() {
        return {
            file:null
        }
    },
    methods:{
        updateMenuSchema(value) {
            this.file = value.target.files[0]
            const menuSchema = { file: this.file}
            this.$emit('updateMenuSchema', menuSchema)
        }
    }
};
</script>