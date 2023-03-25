// Composables
import { createRouter, createWebHistory } from 'vue-router'
import User from '../views/User'
import FoodHub from '../views/FoodHub'

const routes = [
  {
    path: '/',
    component: () => import('@/views/LogIn.vue'),
  },
  {
    path: '/itfoodhub',
    component:  User,
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
