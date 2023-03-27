<template>
    <v-main>
        <v-row
            style="padding-left: 5vh; padding-right: 5vh;"
        >
            <v-col
            class="d-flex flex-column justify-center my-5"
            cols="15"
            >
                <v-row
                    >
                    <v-col
                        cols="15"
                        xl="3"
                        lg="4"
                        md="6"
                        sm="5"
                        xs="8"
                        v-for="i  in 10" 
                    
                    >
                        <CardDelivery ></CardDelivery>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    
    </v-main>   
</template>
<script setup>
    import CardDelivery from "@/components/CardDelivery.vue";


</script>

