<template>
    <div>
        <v-col>
            <div>
                <p class="text-h6 fw-600 text-it">เพิ่มรูปภาพ</p>
                <div class="py-2">
                    <v-file-input hide-details variant="solo" prepend-icon="mdi-camera">
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