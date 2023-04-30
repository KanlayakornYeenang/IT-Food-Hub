<template>
    <v-sheet class="d-flex flex-column py-1">
        <div class="d-flex align-center text-foodhub"> <v-icon>mdi-map-marker</v-icon>
            <div class="px-1"></div>
            <p class="text-h5">ข้อมูลในการจัดส่ง</p>
        </div>
        <div class="d-flex pa-2 align-center" v-if="user">
            <p>{{ user.user_fname }} {{ user.user_lname }}</p>
            <p class="mx-2">{{ user.user_phone }}</p>
            <p>{{ user.user_locat }}</p>
            <div class="px-2"></div>
            <v-btn v-if="show || false" size="small" class="text-it fw-600" @click="updateDialog(true)">แก้ไข</v-btn>
        </div>
        <v-dialog v-model="dialog" max-width="600" scroll-strategy="close">
            <EditCard @updateDialog="updateDialog" />
        </v-dialog>
    </v-sheet>
</template>

<script setup>
import EditCard from "@/components/checkout/EditCard.vue";
</script>

<script>
export default {
    data() {
        return {
            dialog: false,
        }
    },
    props: {
        user: {
            type: Object
        },
        show: {
            type: Boolean
        }
    },
    methods: {
        updateDialog(dialog) {
            this.dialog = dialog
        },
        updateUserInfo() {
            this.showEditDialog = false;
        }
    }
}
</script>