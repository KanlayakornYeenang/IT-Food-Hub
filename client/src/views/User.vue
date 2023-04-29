<template>
    <div class="d-flex justify-center align-center bg-grey-lighten-4" v-if="user">
        <v-col cols="8" class="d-flex my-3">
            <v-row>
                <v-col cols="2">
                    <v-row class="align-center">
                        <v-col cols="4">
                            <v-avatar color="info">

                            </v-avatar>
                        </v-col>
                        <v-col>
                            <v-row>
                                <v-col class="pa-0">{{ user.user_fname }}</v-col>
                                <v-col class="pa-0"> <v-card-subtitle class="pa-0">
                                        <v-icon size="x-small" icon="mdi-pencil"></v-icon>
                                        แก้ไขข้อมูลส่วนตัว
                                    </v-card-subtitle></v-col>
                            </v-row>
                        </v-col>
                        <Group />
                        <!-- <v-col>
                    <v-row>
                        <v-col cols="3">
                            <v-icon 
                                size="x-large"
                                icon="mdi-account">
                            </v-icon>
                            
                        </v-col>
                        <v-col
                            style="margin-top: 0.5vh;"
                        >
                            บัญชีของฉัน
                        </v-col>
                    </v-row> 
                        <div
                            style="padding-left: 7vh; font-size:15px"
                        >
                            <div
                                ><v-btn variant="plain"
                                    style="padding-right:8vh;"
                                    :to="'/itfoodhub/user'"
                                >ประวัติ</v-btn>
                            </div>
                            <div
                                ><v-btn variant="plain"
                                    :to="'/itfoodhub/user/password'"
                                >เปลี่ยนรหัสผ่าน</v-btn>
                            </div>
                            <div
                                style="padding-left: 1vh;"
                                ><v-btn variant="plain"
                                    :to="'/itfoodhub/user/cart'"
                                >รายการการสั้งซ์้อ</v-btn>
                            </div>  
                            <div
                                style="padding-left: 1vh;"
                                ><v-btn variant="plain"
                                    :to="'/itfoodhub/user/myorder'"
                                >รายการที่ต้องส่ง</v-btn>
                            </div>  
                        </div>
                </v-col> -->
                    </v-row>
                </v-col>
                <v-col>
                    <div style=" width:100vh; height:100%" v-if="user">
                        <router-view :key="$route.fullPath" :user="user"></router-view>
                    </div>
                </v-col>
            </v-row>
        </v-col>
    </div>
</template>

<script setup>
import Group from "@/components/user/Group.vue"
</script>


<script>
export default {
    props: {
        user: {
            type: Object,
        },
    },

};
</script>   