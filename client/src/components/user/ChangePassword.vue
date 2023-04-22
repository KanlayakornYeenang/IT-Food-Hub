<template>
    <div
    style="padding-left: 2vh; padding-right: 2vh;"
    >
        <div style="margin-bottom: 6vh; border-bottom: 1px solid grey;">
            <v-col>
                <div
                    style="font-size: 20px;"
                >
                    เปลี่ยนรหัสผ่าน
                </div>
                <div
                    style="font-size: 12px; margin-bottom:1px solid black; font-weight:lighter"
                >
                    กรุณาอย่าเปิดเผยรหัสผ่านแก่คนอื่นๆ เพื่อความปลอดภัยของบัญชีผู้ใช้คุณเอง
                </div>
            </v-col>
        </div>
        <div
            style="margin-bottom: 4vh;"
        >
            <div
                style=" width:70vh"
            >
                <v-row>
                    <v-col 
                        style="display: flex; justify-content: end"
                        cols="4">
                            <span
                            style="color: grey;padding-top:1vh; font-size:20px"
                            >รหัสผ่านเก่า</span>
                    </v-col>
                    <v-col>
                        <div style="display: flex;">
                            <v-text-field
                            style="max-width: 34vh;"
                            variant="outlined"
                            >
                            </v-text-field>
                            <v-btn
                                style="margin-top:1vh ;"
                                variant="text"
                            >
                                ลืมรหัสผ่าน
                            </v-btn>
                        </div>  
                    </v-col>
                </v-row>  
                <v-row>
                    <v-col 
                        style="display: flex; justify-content: end"
                        cols="4">
                            <span
                            style="color: grey;padding-top:1vh; font-size:20px"
                            >รหัสผ่านใหม่</span>
                    </v-col>
                    <v-col>
                        <div>
                            <v-text-field
                                style="max-width: 34vh;"
                                variant="outlined"
                             >
                             </v-text-field>
                        </div>  
                    </v-col>
                </v-row>  
                <v-row>
                    <v-col 
                        style="display: flex; justify-content: end"
                        cols="4">
                            <span
                            style="color: grey;padding-top:1vh; font-size:20px"
                            >ยืนยันรหัสผ่าน</span>
                    </v-col>
                    <v-col>
                        <div>
                             <v-text-field
                                style="max-width: 34vh;"
                                variant="outlined"
                             >
                             </v-text-field>
                        </div>  
                    </v-col>
                </v-row>  
                <v-row>
                    <v-col 
                        style="display: flex; justify-content: end"
                        cols="4">
                    </v-col>
                    <v-col>
                        <div>
                            <v-btn
                            variant="outlined"
                            >ยืนยัน</v-btn>
                        </div>  
                    </v-col>
                </v-row>  
            </div>
            
        </div>
    </div>
</template>
<style>
</style>