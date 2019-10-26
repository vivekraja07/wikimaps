import Vue from 'vue'
import VueRouter from 'vue-router'

import EditMap from '../components/EditMap'
import ViewMap from '../components/ViewMap'

Vue.use(VueRouter)

const routes = [
  {
    path: '/view',
    name: 'view-Map',
    component: ViewMap
  },
  {
    path: '/edit',
    name: 'edit-map',
    component: EditMap
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
