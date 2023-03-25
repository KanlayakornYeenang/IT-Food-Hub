// Composables
import { createRouter, createWebHistory } from 'vue-router'
import User from '../views/User'
import FoodHub from '../views/FoodHub'
import Restaurant from '../views/Restaurant'

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
     },
     {
      path: ':Restaurant_name',
      component: Restaurant
     },
    ]
    
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
