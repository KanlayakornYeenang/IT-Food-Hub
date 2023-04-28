<template>
    <v-sheet>
        <div class="d-flex text-it fw-600 text-h6 pb-3">
            <v-icon>mdi-storefront</v-icon>
            <v-hover v-slot="{ isHovering, props }">
                <router-link :to="'/itfoodhub/' + restaurant.rst_id" style="text-decoration: none;">
                    <v-card style="cursor: pointer;" :class="isHovering ? 'bg-it px-1 mx-1' : 'text-it px-1 mx-1'"
                        v-bind="props" elevation="0">{{ restaurant.rst_name }}<v-tooltip activator="parent"
                            location="end">ไปยังร้านค้า</v-tooltip></v-card>
                </router-link>
            </v-hover>
        </div>
        <div class="d-flex">
            <div class="w-100">
                <v-col v-for="menu, menu_index in restaurant.menu" :key="menu_index" class="pa-0 pb-4 d-flex align-center">
                    <v-col cols="1" class="pa-0">
                        <v-img
                            src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="></v-img>
                    </v-col>
                    <v-col cols="9">
                        <p class="fw-600">{{ menu.menu_name }}</p>
                        <v-card-subtitle class="pa-0">{{ menu.item }}</v-card-subtitle>
                    </v-col>
                    <v-col cols="2" class="d-flex justify-space-between fw-600">
                        <p>{{ menu.quantity }}X</p>
                        <p>฿{{ menu.price * menu.quantity }}</p>
                    </v-col>
                </v-col>
            </div>
        </div>
        <v-divider></v-divider>
    </v-sheet>
</template>

<script>
export default {
    data() {
        return {
            //
        }
    },
    props: {
        restaurant: {
            type: Object
        }
    }
}
</script>