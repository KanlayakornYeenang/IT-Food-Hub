// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import FoodHub from '../views/FoodHub'

const routes = [
  {
    path: '/',
    component: () => import('@/views/LogIn.vue'),
  },
  {
    path: '/Home',
    component:  Home,
    children:[
     {
      path: '',
      component: FoodHub
     }

    ]
    
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
