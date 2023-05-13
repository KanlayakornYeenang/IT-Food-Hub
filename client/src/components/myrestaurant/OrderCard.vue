<template>
    <div>
        <v-card rounded="lg">
            <v-card elevation="0"><v-card-item>
                    <div>
                        <div class="d-flex align-center justify-space-between my-2">
                            <div>
                                <p class="text-grey mr-1">คนส่งอาหาร</p>
                            </div>
                            <div class="d-flex align-center">
                                <div class="d-flex align-center mx-1">
                                <v-icon size="small" class="text-grey mr-1">mdi-account-circle</v-icon>
                                <p class="fw-600">{{ delivery_person.user_fname + " " + delivery_person.user_lname }}</p>
                            </div>
                            <div class="d-flex align-center ml-1">
                                <v-icon size="x-small" class="text-grey mr-1">mdi-phone</v-icon>
                                <p class="fw-600">{{ delivery_person.user_phone }}</p>
                            </div>
                            </div>
                        </div>
                        <div class="d-flex align-center justify-space-between my-2">
                            <div class="text-grey">เวลาจัดส่งอาหาร</div>
                            <div class="d-flex align-center">
                                <div class="d-flex align-center mx-1">
                                    <v-icon size="small" class="mr-1 text-grey">mdi-calendar-month</v-icon>
                                    <p class="fw-600">{{ reverseDateFormat(date) }}</p>
                                </div>
                                <div class="d-flex align-center ml-1">
                                    <v-icon size="small" class="mr-1 text-grey">mdi-clock-outline</v-icon>
                                    <p class="fw-600">{{ addedTime }} น.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-card-item></v-card>
            <v-card rounded="lg" color="#edf4ff" class="text-center mx-3 mb-3">
                <div v-for="item, i in menu" :key="i">
                    <div class="pa-3">
                        <div class="d-flex justify-justify-between align-center text-it fw-600 text-h6">
                            <v-checkbox v-model="checkbox[i]" hide-details>
                                <template v-slot:label>
                                    <p class="text-h6" :style="checkbox[i] ? 'text-decoration: line-through;' : ''">{{
                                        item.menu_name }}</p>
                                </template>
                            </v-checkbox>
                            <p :style="checkbox[i] ? 'text-decoration: line-through;' : ''">x{{ item.quantity }}</p>
                        </div>
                        <div :style="checkbox[i] ? 'text-decoration: line-through;' : ''"
                            class="d-flex justify-justify-between align-center pl-10">
                            {{ item.item }}
                        </div>
                    </div>
                    <v-divider></v-divider>
                </div>
            </v-card>
            <v-card class="text-center pb-3 d-flex align-center justify-center">
                <p v-if="order.order_status == 1">กำลังทำอาหาร...</p>
                <p v-else>เสร็จสิ้น</p>
                <v-btn class="mx-3" style="position:absolute; right: 0;" color="error" size="small">ยกเลิก</v-btn>
            </v-card>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            date: this.order.order_date_time.split(" ")[0],
            time: this.order.order_date_time.split(" ")[1],
            convertedTime: '',
            addedTime: '',
            checkbox: [],
        }
    },
    props: {
        order: {
            type: Object
        },
        menu: {
            type: Object
        },
        delivery_person: {
            type: Object
        }
    },
    mounted() {
        for (let i = 0; i < this.order.length; i++) {
            this.checkbox.push(false)
        }
        this.convertTime();
        this.addTime();
    },
    methods: {
        convertTime() {
            const timeParts = this.time.split(':');
            const convertedTime = `${timeParts[0]}:${timeParts[1]}`;
            this.convertedTime = convertedTime;
        },
        addTime() {
            const timeParts = this.time.split(':');
            const hours = parseInt(timeParts[0]);
            const minutes = parseInt(timeParts[1]);

            const totalMinutes = hours * 60 + minutes + 15;

            const addedHours = Math.floor(totalMinutes / 60);
            const addedMinutes = totalMinutes % 60;

            const addedTime = `${this.padZero(addedHours)}:${this.padZero(addedMinutes)}`;
            this.addedTime = addedTime;
        },
        padZero(value) {
            return value.toString().padStart(2, '0');
        },
        reverseDateFormat(dateString) {
            const parts = dateString.split('-');
            const reversedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
            return reversedDate;
        }
    }
}
</script>