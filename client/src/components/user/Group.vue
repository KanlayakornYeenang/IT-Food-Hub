<template>
    <v-card class="mx-auto" width="300" elevation="0" style="background: transparent;">
        <v-list v-model:opened="open" style="background: transparent;">
            <v-list-group value="บัญชีของฉัน">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" prepend-icon="mdi-account-circle">
                        <v-list-item-title style="white-space: pre-wrap;">
                            <p class="text-body-2">บัญชีของฉัน</p>
                        </v-list-item-title>
                    </v-list-item>
                </template>
                <v-list-item>
                    <p class="text-body-2">ข้อมูลส่วนตัว</p>
                </v-list-item>
                <v-list-item>
                    <p class="text-body-2">เปลี่ยนอีเมลล์และรหัสผ่าน</p>
                </v-list-item>
            </v-list-group>
            <v-list-item prepend-icon="mdi-receipt-text"><v-list-item-title style="white-space: pre-wrap;">
                    <p class="text-body-2">รายการของฉัน</p>
                </v-list-item-title></v-list-item>
                <v-list-item prepend-icon="mdi-pin"><v-list-item-title style="white-space: pre-wrap;">
                    <p class="text-body-2">รายการที่ต้องจัดส่ง</p>
                </v-list-item-title></v-list-item>
        </v-list>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        open: ['บัญชีของฉัน'],
    }),
}
</script>