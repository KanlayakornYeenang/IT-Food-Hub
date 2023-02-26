// const routes = [
//   {
//     path: '/',
//     component: () => import('@/layouts/default/Default.vue'),
//     children: [
//       {
//         path: '',
//         name: 'Home',
//         // route level code-splitting
//         // this generates a separate chunk (about.[hash].js) for this route
//         // which is lazy-loaded when the route is visited.
//         component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
//       },
//     ],
//   },
// ]

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import MyRestaurant from '../views/MyRestaurant.vue'
import User from '../views/User.vue'
import OrderDelivery from '../views/OrderDelivery.vue'
import Restaurant from '../views/Restaurant.vue'

const routes = [
  {
    //หน้าแรก
    path: '/',
    name: 'user',
    component: User
  },
  {
    // หน้าที่มายทำ
    path: '/Restaurants',
    name: 'home',
    component: Home 
  },
  {
    //หน้าคำสั้งของไรเดอ
    path: '/Order',
    name: 'order',
    component : OrderDelivery
  },
  {
    // ไม่มีอะไร
    path: '/Restaurant',
    name: 'Restaurant',
    component : Restaurant
  },
  {
    path: '/test',
    name: 'Restaurant',
    component : Test
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
