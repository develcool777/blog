import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import MyWorks from '@/views/MyWorks.vue';
import Advertisement from '@/views/Advertisement.vue';
import About from '@/views/About.vue';
import Profile from '@/views/Profile.vue';
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    props: { activeMenu: 2 }
  },
  {
    path: '/works',
    name: 'MyWorks',
    component: MyWorks
  },
  {
    path: '/advertisement',
    name: 'Advertisement',
    component: Advertisement,
    props: { activeMenu: 4 }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    props: { activeMenu: 3 }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    props: { activeMenu: 5 }
  }
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
