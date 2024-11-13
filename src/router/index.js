import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../pages/Auth.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/home",
    name: "app-layout",
    component: () => import("../layout/AppLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "companies",
        name: "companies",
        component: () => import("../pages/Companies/Companies.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../pages/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authenticated = localStorage.getItem("user");

  if (to.name === "login" && authenticated) {
    next({ name: "app-layout" });
  } else if (to.meta.requiresAuth && !authenticated) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
