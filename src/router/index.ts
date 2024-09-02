import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/barangrongsok",
      name: "barangrongsok",
      component: HomeView,
    },
    {
      path: "/home",
      name: "homepage",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/homepage.vue"),
    },
    {
      path: "/register",
      name: "register",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/register.vue"),
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/login.vue"),
    },
    {
      path: "/reset",
      name: "reset",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/reset.vue"),
    },
    {
      path: "/beranda",
      name: "beranda",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/beranda.vue"),
    },
    {
      path: "/addproduct",
      name: "addproduct",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/addproduct.vue"),
    },
    {
      path: "/detailbarang",
      name: "detailbarang",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/detailbarang.vue"),
    },
    {
      path: "/halamanchat",
      name: "halamanchat",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/halamanchat.vue"),
    },
    {
      path: "/halamanprofileuser",
      name: "halamanprofileuser",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/halamanprofileuser.vue"),
    },
    {
      path: "/halamanchatuser",
      name: "halamanchatuser",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/halamanchatuser.vue"),
    },
    {
      path: "/halamandisukaiuser",
      name: "halamandisukaiuser",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/halamandisukaiuser.vue"),
    },
    {
      path: "/halamanprofile",
      name: "halamanprofile",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/halamanprofile.vue"),
    },
    {
      path: "/popupstatusproduk",
      name: "popupstatusproduk",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/popupstatusproduk.vue"),
    },
  ],
});

export default router;
