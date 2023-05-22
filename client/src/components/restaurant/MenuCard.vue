<template>
  <div>
    <v-card :ripple="actions == 'customer'" @click="handleOpen"
      :style="actions == 'customer' ? 'cursor:pointer' : 'cursor:context-menu'" rounded="lg" elevation="2"
      class="overflow-hidden">
      <v-img src="https://endlessicons.com/wp-content/uploads/2012/11/image-holder-icon-614x460.png"></v-img>
      <v-card-item>
        <v-card-title>{{ menu.menu_name }}</v-card-title>
        <v-card-subtitle v-if="menu.menu_desc" class="my-2">
          {{ menu.menu_desc }}
        </v-card-subtitle>

        <v-card-actions v-if="actions == 'customer'" class="d-flex justify-space-between">
          <v-card-title class="fw-600">
            {{ formatNumber(menu.menu_price) }}
          </v-card-title>
          <v-btn elevation="2" class="bg-success pa-0 ma-0" size="small">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-actions>

        <v-card-actions v-else class="d-flex justify-space-between">
          <v-card-title class="fw-600">
            {{ formatNumber(menu.menu_price) }}
          </v-card-title>
          <div>
            <v-btn @click="dialog = true" icon elevation="0" class="pa-0 ma-0 bg-it mr-2" size="x-small">
              <v-icon>mdi-square-edit-outline</v-icon>
            </v-btn>
            <v-btn @click="deleteMenu(menu.menu_id, menu.menu_cat)" icon elevation="0" class="pa-0 ma-0 bg-red"
              size="x-small">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </div>
        </v-card-actions>

      </v-card-item>
    </v-card>

    <v-dialog v-if="actions == 'customer'" v-model="dialog" scroll-strategy="none" width="600">
      <MenuDialog :restaurant_name="restaurant_name" :menu="menu" @updateDialog="updateDialog" />
    </v-dialog>
    <v-dialog v-else v-model="dialog" scroll-strategy="none" width="750">
      <EditMenu :restaurant_name="restaurant_name" :menu="menu" :categories=categories @updateDialog="updateDialog" />
    </v-dialog>
  </div>
</template>

<script setup>
import MenuDialog from "@/components/restaurant/MenuDialog.vue";
import EditMenu from "@/components/myrestaurant/EditMenu.vue";
import axios from "@/plugins/axios";
</script>

<script>
export default {
  props: {
    restaurant_name: {
      type: String
    },
    menu: {
      type: Object,
    },
    actions: {
      type: String,
    },
    categories: {
      type: Object
    },
  },
  data() {
    return {
      dialog: false,
      dialogDel: false,
    };
  },
  methods: {
    handleOpen() {
      if (this.actions == "customer") {
        this.dialog = true
      }
    },
    formatNumber(number) {
      if (number.split(".")[1] == "00") {
        return number.split(".")[0];
      }
      return number;
    },
    updateDialog(dialog) {
      this.dialog = dialog;
    },
    deleteMenu(menu_id, menu_cat) {
      this.$emit("deleteMenu", this.index, menu_cat);
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].menu_cat == menu_cat) {
          for (let j = 0; j < this.categories[i].menu.length; j++) {
            if (this.categories[i].menu[j].menu_id == menu_id) {
              this.categories[i].menu.splice(j, 1)
            }
            if (this.categories[i].menu.length == 0) {
              this.categories.splice(i, 1)
            }
          }
        }
      }
      axios.delete("/partner/deleteMenu", { params: { menu_id } })
    }
  },
};
</script>
