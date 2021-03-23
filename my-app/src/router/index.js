import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '@/views/About.vue'
import DocsView from '@/views/Docs.vue'
import CreateWebspaceView from '@/views/CreateWebspace.vue'
import ManageWebspaceView from '@/views/ManageWebspace.vue'
import AccountView from '@/views/Account.vue'

const routes = [
  { path: '/about', component: AboutView },
  { path: '/docs', component: DocsView },
  { path: '/createwebspace', component: CreateWebspaceView },
  { path: '/managewebspace', component: ManageWebspaceView },
  { path: '/account', component: AccountView }
  // TODO: 404 - not found
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
