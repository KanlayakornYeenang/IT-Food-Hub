<template>
    <v-card>
        <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua.
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" block @click="handleClose()">Close Dialog</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import eventbus from '@/plugins/eventBus';
export default {
    data() {
        return {
            //
        }
    },
    props: {
        categories: {
            type: Object
        }
    },
    methods: {
        handleClose() {
            eventbus.emit('updateButton', 'close')
        }
    }
}
</script>