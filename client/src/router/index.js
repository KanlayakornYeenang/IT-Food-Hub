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
          },
          {
            path:"cart",
            component: ()=>import("@/components/user/cart/Cart.vue"),
          },
          {
            path:"cart/order/:orderid",
            component: () => import("@/components/user/cart/CartDetail.vue")
          },
          {
            path: "myorder",
            component: () => import("@/components/user/MyOrder.vue")
          }
        ]
      },
      {
        path:"checkout",
        component: () => import("@/views/Checkout.vue"),
      },
      {
        path:"pickorder",
        component: () => import("@/views/PickOrder.vue"),
      },
      {
        path:"pickorder/:orderid",
        component:()=>import("@/views/OrderDelivery.vue")
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
