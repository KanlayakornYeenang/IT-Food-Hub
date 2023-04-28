<template>
    <v-sheet class="d-flex flex-column pa-1">
        <div class="d-flex align-center text-foodhub"> <v-icon>mdi-map-marker</v-icon>
            <div class="px-1"></div>
            <p class="text-h5">ข้อมูลในการจัดส่ง</p>
        </div>
        <div class="d-flex pa-2 align-center" v-if="user">
            <p>{{ user.user_fname }} {{ user.user_lname }}</p>
            <p class="mx-2">{{ user.user_phone }}</p>
            <p>{{ user.user_locat }}</p>
            <div class="px-2"></div>
            <v-btn size="small" class="text-it fw-600">แก้ไข</v-btn>
        </div>
    </v-sheet>
</template>

<script>
export default {
    data() {
        return {
            //
        }
    },
    props: {
        user: {
            type: Object
        }
    }
}
</script>