<template>
  <v-card color="#f7f7f7" rounded="lg">
    <v-card elevation="0" class="mb-2 pa-2">
      <div class="text-right mb-2">
        <v-btn color="transparent" icon @click="updateDialog" elevation="0"><v-icon>mdi-close</v-icon></v-btn>
      </div>
      <v-divider></v-divider>
      <v-card-items>
        <v-card-title class="mt-2 text-center">
          <p class="text-h5 fw-600">แก้ไขเมนู</p>
        </v-card-title>
      </v-card-items>
    </v-card>
    <v-card class="pa-2 overflow-y-auto" elevation="0" style="height:63.5vh">
      <v-card-items>
        <AddImageSection />
        <AddFoodNameSection :menu_name="menu.menu_name" @updateMenuSchema="updateMenuSchema" />
        <AddFoodDescriptionSection :menu_desc="menu.menu_desc" @updateMenuSchema="updateMenuSchema" />
        <FoodOptionsSection :menu_cat="menu.menu_cat" :menu_price="menu.menu_price" :categories="categories"
          :options="new_options" @updateMenuSchema="updateMenuSchema" />
      </v-card-items>
    </v-card>
    <v-card elevation="0" class="pa-2 ma-2">
      <v-card-items class="d-flex justify-center">
        <v-btn size="large" class="text-success text-h5 fw-600" elevation="0" @click="editMenu">ยืนยัน</v-btn>
      </v-card-items>
    </v-card>
  </v-card>
</template>
  
<script setup>
import AddImageSection from "@/components/myrestaurant/AddImageSection.vue";
import AddFoodNameSection from "@/components/myrestaurant/AddFoodNameSection.vue";
import AddFoodDescriptionSection from "@/components/myrestaurant/AddFoodDescriptionSection.vue";
import FoodOptionsSection from "@/components/myrestaurant/FoodOptionsSection.vue";
</script>
  
<script>
import eventbus from "@/plugins/eventBus";
import axios from "@/plugins/axios.js";
export default {
  data() {
    return {
      del_items: [],
      del_options: [],
      options: null,
      new_options: [],
      selected: {},
      quantity: 1,
      menuSchema: { menu_name: this.menu.menu_name, menu_desc: this.menu.menu_desc, menu_cat: this.menu.menu_cat, options: [], menu_price: this.menu.menu_price }
    };
  },
  props: {
    menu: {
      type: Object,
    },
    categories: {
      type: Object
    }
  },
  methods: {
    updateDialog() {
      this.$emit("updateDialog", false);
    },
    updateMenuSchema(menuSchema) {
      this.menuSchema = Object.assign(this.menuSchema, menuSchema)
    },
    editMenu() {
      axios.post("/partner/addOption", { menu_id: this.menu.menu_id, menuSchema: this.menuSchema })
      axios.post("/partner/addItem", { menu_id: this.menu.menu_id, menuSchema: this.menuSchema })
      axios.patch("/partner/editMenu", { menu_id: this.menu.menu_id, menuSchema: this.menuSchema })

      if (this.del_items.length > 0) {
        axios.delete("/partner/deleteItem", { params: this.del_items })
      }
      if (this.del_options.length > 0) {
        axios.delete("/partner/deleteOption", { params: this.del_options })
      }
      this.updateDialog()
    }
  },
  mounted() {
    axios
      .get(this.$route.path + "/" + this.menu.menu_id)
      .then((res) => {
        this.options = res.data;
        for (let i = 0; i < this.options.length; i++) {
          this.options[i].item.push({ "item_name": null, "item_price": null })
          this.new_options.push({ option_id: this.options[i].option_id, option_name: this.options[i].option_name, items: this.options[i].item, option_type: this.options[i].option_type, max_optional: this.options[i].max_optional })
        }
        this.menuSchema = Object.assign(this.menuSchema, { options: this.new_options })
      })
      .catch((err) => {
        console.log(err);
      });
    eventbus.on('updateDelItems', del_items => {
      this.del_items = del_items
    })
    eventbus.on('updateDelOptions', del_options => {
      this.del_options = del_options
    })
    eventbus.on('updateMenuSchema', options => {
      this.menuSchema = Object.assign(this.menuSchema, { options: options })
    })
  },
};
</script>