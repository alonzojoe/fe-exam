import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../pages/Auth.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/dashboard",
    name: "app-layout",
    component: () => import("../layout/AppLayout.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
