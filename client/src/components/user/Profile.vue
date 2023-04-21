<template>
    <div
        style="padding-left: 2vh; padding-right: 2vh;"
        >
        <div style="margin-bottom: 6vh; border-bottom: 1px solid grey;">
            <v-col>
                <div
                    style="font-size: 20px;"
                >
                    ข้อมูลของฉัน
                </div>
                <div
                    style="font-size: 12px; margin-bottom:1px solid black; font-weight:lighter"
                >
                    จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้
                </div>
            </v-col>
        </div>
        <div >
            <v-row
            >
                <v-col cols="6"
                style="border-right: 1px solid grey"
                >
                    <div style="padding-left: 3vh;">
                           <div
                                class="detail"
                            >
                                <v-row>
                                    <v-col cols="5"
                                        style="display: flex; justify-content: end"
                                    >
                                    <span
                                        style="color: grey;"
                                    >ชื่อผู้ใช้</span>
                                    </v-col>
                                    <v-col>
                                        vorawee
                                    </v-col>
                                </v-row>
                           </div>
                           <div
                            class="detail"
                            >
                                <v-row>
                                    <v-col 
                                        style="display: flex; justify-content: end"
                                    cols="5">
                                    <span
                                        style="color: grey;"
                                    >หมายเลขโทรศัพท์</span>
                                    </v-col>
                                    <v-col>
                                        0916855522 
                                        <v-btn variant="text" style="color: red;">
                                            เปลี่ยน
                                        </v-btn>
                                    </v-col>
                                </v-row>  
                           </div>
                           <div
                            class="detail"
                            >
                                <v-row>
                                    <v-col 
                                        style="display: flex; justify-content: end"
                                    cols="5">
                                        <span
                                            style="color: grey;"
                                        >อีเมล</span>
                                    </v-col>
                                    <v-col>
                                        vorawee@gmail.com
                                    </v-col>
                                </v-row>  
                           </div>
                           <div
                            class="detail"
                            >
                                <v-row>
                                    <v-col 
                                        style="display: flex; justify-content: end"
                                    cols="5">
                                        <span
                                            style="color: grey;"
                                        ></span>
                                    </v-col>
                                    <v-col>
                                        <v-btn
                                        variant="outlined"
                                        >บันทึก</v-btn>
                                    </v-col>
                                </v-row>  
                           </div>
                    </div>
                </v-col>
                <v-col>
                    <div>
                        <div class="d-flex justify-center align-center"
                            style="margin-bottom: 4vh;"
                        >
                            <v-avatar color="info" size="150">
                                <v-icon icon="mdi-account-circle"></v-icon>
                            </v-avatar>
                        </div>
                        <div class="d-flex justify-center align-center">
                            <div>
                                <v-file-input
                                    style="width: 30vh; height:5vh"
                                    hide-details
                                    label="เลือกรูป"
                                    variant="underlined"
                                    prepend-icon="mdi-camera"
                                ></v-file-input>
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </div>
    </div>
</template>
<style>
.detail{
    margin-bottom: 3vh;
}
</style>