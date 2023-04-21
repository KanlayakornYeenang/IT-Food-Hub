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
    component: () => import("@/views/Default.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/ITFoodHub.vue"),
      },
      {
        path: ":rst_id",
        component: () => import("@/views/Restaurant.vue"),
      },
      {
        path:"user",
        component: ()=>import("@/views/User.vue"),
        children:[
          {
            path:"",
            component: ()=>import("@/components/user/Profile.vue"),
          },
          {
            path:"password",
            component: ()=>import("@/components/user/ChangePassword.vue"),
          }
        ]
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
