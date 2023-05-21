<template>
    <div class="d-flex justify-center bg-grey-lighten-4" v-if="user">
        <v-col cols="8" class="d-flex my-3">
            <v-row>
                <v-col cols="2" class="mt-3">
                    <div class="d-flex align-center mb-3"><v-avatar color="it"><v-img :src=imagePath(user.file_path)></v-img></v-avatar>
                        <p class="ml-2">{{ this.user.user_fname}}</p>
                    </div>
                    <Group />
                </v-col>
                <v-col>
                    <div v-if="user">
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
    data() {
        return {
            user_detail: this.user,
        };
    },
    methods:{
        imagePath(file_path) {
            if (file_path) {
                return "http://localhost:5000/" + file_path;
            } else {
                return "http://localhost:5000/" + file_path;
            }
        },
    }
    


};
</script>   