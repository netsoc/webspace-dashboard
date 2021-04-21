import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '@/views/About.vue'
import DocsView from '@/views/Docs.vue'
import LoginView from '@/views/Login.vue'
import CreateWebspaceView from '@/views/CreateWebspace.vue'
import AccountView from '@/views/Account.vue'
import WebspaceConfigView from '@/views/WebspaceConfiguration.vue'
import StatusView from '@/views/Status.vue'
import ErrorView from '@/views/Error.vue'
import ConsoleView from '@/views/Console.vue'

const routes = [
  { path: '/', component: AboutView },
  { path: '/login', component: LoginView },
  { path: '/docs', component: DocsView },
  { path: '/createwebspace', component: CreateWebspaceView },
  { path: '/status', component: StatusView },
  { path: '/config', component: WebspaceConfigView },
  { path: '/account', component: AccountView },
  { path: '/console', component: ConsoleView },
  { path: '/:pathMatch(.*)', component: ErrorView, props: { errorTitle: 'Page not found!', errorDetails: 'Could not find requested page.' } }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
