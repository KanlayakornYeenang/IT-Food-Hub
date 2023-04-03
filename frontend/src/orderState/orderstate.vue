<template>
    <v-card
        style="width: 60vh;height: 40vh; border-radius:20px; padding:1vh"
    >
        <div style="padding:2vh; font-weight:bold; font-size:larger">
            ร้านพี่ช้าง
            <div
                style="font-size: small; margin-top:0.5vh"
            >
                ID : 323131
            </div>
        </div>
        <div 
            style="margin: 1vh; display: flex"
        >
            <div
                style="padding:0; width:50vh; margin-left:2vh; margin-right:2vh;"
            >
                <v-timeline direction="horizontal"
                    style="padding: 0;"
                    line-inset="-80"
                >
                    <v-timeline-item
                        size="small"
                        style="margin: 0;"
                        dot-color="green"
                    >
                        <div
                            style="font-size: 10px;"
                        >
                           ได้รับคำสั้งซื้อเรียบร้อย
                        </div>
                    </v-timeline-item>
                    <v-timeline-item
                        size="small"
                        style="margin: 0;"
                        dot-color="black"
                    >
                        <div
                            style="font-size: 10px;"
                        >
                            ถึงร้านอาหารเรียบร้อย
                        </div>
                    </v-timeline-item>
                    <v-timeline-item
                        size="small"
                        style="margin: 0;"
                        dot-color="black"
                    >
                        <div
                             style="font-size: 10px;"
                        >
                            กำลังไปส่งอาหาร
                        </div>
                    </v-timeline-item>
                    <v-timeline-item
                    size="small"
                    style="margin: 0;"
                    dot-color="black"
                    >
                        <div
                            style="font-size: 10px"
                        >
                            ส่งอาหารเรียบร้อย
                        </div>
                    </v-timeline-item>
                </v-timeline>
            </div>
        </div>
        <div
            style="margin-left:2vh; font-weight: bold"
        >
            Details
        </div>
    </v-card>
</template>
<script setup>

</script>

<script>

</script>