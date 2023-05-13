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
export default {
    data() {
        return {

        }
    },
    props: {

    },
    methods: {
        handleClose() {
            this.$emit('updateAddMenu', false)
        }
    }
}
</script>