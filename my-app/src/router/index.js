import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Dashboard,
    children: [
      {
        path: 'about',
        component: () => import(/* webpackChunkName: "about" */ '@/views/About')
      },
      {
        path: '/docs',
        component: () => import(/* webpackChunkName: "docs" */ '@/views/Docs')
      },
      {
        path: '/createwebspace',
        component: () => import(/* webpackChunkName: "createwebspace" */ '@/views/CreateWebspace')
      },
      {
        path: '/managewebspace',
        component: () => import(/* webpackChunkName: "managewebspace" */ '@/views/ManageWebspace')
      },
      {
        path: '/account',
        component: () => import(/* webpackChunkName: "account" */ '@/views/Account')
      },
      
    ]
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
