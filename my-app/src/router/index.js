import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '@/views/About.vue'
import DocsView from '@/views/Docs.vue'
import LoginView from '@/views/Login.vue'
import CreateWebspaceView from '@/views/CreateWebspace.vue'
import ManageWebspaceView from '@/views/ManageWebspace.vue'
import AccountView from '@/views/Account.vue'
import WebspaceConfiguration from '@/views/WebspaceConfiguration.vue'
import Status from '@/views/Status.vue'
import ErrorView from '@/views/Error.vue'
import Console from '@/views/Console.vue'

// TODO: user beforeEach() to check if a route is valid for the state of the user.
// e.g. don't let users without an authentication token access /account
// or don't let users with a token access /login
const routes = [
  { path: '/', component: LoginView },
  { path: '/about', component: AboutView },
  { path: '/docs', component: DocsView },
  { path: '/createwebspace', name: 'home', component: CreateWebspaceView },
  { path: '/managewebspace', component: ManageWebspaceView },
  { path: '/account', component: AccountView },
  { path: '/config', component: WebspaceConfiguration },
  { path: '/status', component: Status },
  { path: '/:pathMatch(.*)', component: ErrorView },
  { path: '/:console', component: Console }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
