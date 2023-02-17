import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/list'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/pdf/:id',
    name: 'Pdf',
    component: () => import('../views/PdfviewerPage.vue')
  },
  {
    path: '/add',
    name: 'AddPdf',
    component: () => import('../views/AddPdfPage.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/ListPdfPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
