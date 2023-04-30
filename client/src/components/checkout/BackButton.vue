<template>
    <v-hover v-slot="{ isHovering, props }">
        <v-card @click="this.$router.go(-1);" class="pa-1 px-3" elevation="0" style="width:fit-content; cursor: pointer;"
            v-bind="props" :color="isHovering ? 'it' : 'transparent'">
            <p><v-icon>mdi-keyboard-backspace</v-icon> Back</p>
        </v-card>
    </v-hover>
</template>