import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/Login.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
  },
  {
    path: "/labs",
    name: "Labs",
    component: () => import("@/views/Lab.vue"),
  },
  {
    path: "/teachers",
    name: "Teachers",
    component: () => import("@/views/Teacher.vue"),
  },
  {
    path: "/courses",
    name: "Courses",
    component: () => import("@/views/Course.vue"),
  },
  {
    path: "/reservation",
    name: "Reservation",
    component: () => import("@/views/Reservation.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
