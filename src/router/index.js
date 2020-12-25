import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/add-smoothie',
    name: 'AddSmoothie',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "AddSmoothie" */ '@/components/AddSmoothie'),
  },
  {
    path: '/edit-smoothie/:smoothie_slug',
    name: 'EditSmoothie',
    component: () =>
      import(
        /* webpackChunkName: "EditSmoothie" */ '@/components/EditSmoothie'
      ),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
