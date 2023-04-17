// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/components/nav/PublicNav.vue"),
  },
  {
    path: "/login",
    component: () => import("@/views/LogIn.vue"),
  },
  {
    path: "/itfoodhub",
    component: () => import("@/components/nav/PrivateNav.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/ITFoodHub.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
