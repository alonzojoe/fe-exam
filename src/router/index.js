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
        path: "",
        name: "media",
        component: () => import("../pages/Media/Media.vue"),
        meta: { requiresType: ["Editor", "Writer"] },
      },
      {
        path: "dashboard/writer",
        name: "dashboard-writer",
        component: () => import("../pages/Dashboard/Writer.vue"),
        meta: { requiresType: ["Writer"] },
      },
      {
        path: "dashboard/editor",
        name: "dashboard-editor",
        component: () => import("../pages/Dashboard/Editor.vue"),
        meta: { requiresType: ["Editor"] },
      },
      {
        path: "companies",
        name: "companies",
        component: () => import("../pages/Companies/Companies.vue"),
        meta: { requiresType: ["Editor"] },
      },
      {
        path: "users",
        name: "users",
        component: () => import("../pages/Users/Users.vue"),
        meta: { requiresType: ["Editor"] },
      },
    ],
  },
  {
    path: "/unauthorized",
    name: "unauthorized",
    component: () => import("../pages/Unauthorized.vue"),
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
  const authenticated = localStorage.getItem("fe-exam-auth-user");
  const storedAuth = JSON.parse(authenticated);
  const userAuth = storedAuth
    ? {
        id: storedAuth.id,
        firstname: storedAuth.firstname,
        lastname: storedAuth.lastname,
        username: storedAuth.username,
        type: storedAuth.type,
        status: storedAuth.status,
      }
    : null;

  console.log("routes auth", userAuth);

  if (to.meta.requiresAuth && !authenticated) {
    next({ name: "login" });
  } else if (
    to.meta.requiresType &&
    userAuth &&
    !to.meta.requiresType.includes(userAuth.type)
  ) {
    next({ name: "unauthorized" });
  } else if (to.name === "login" && authenticated) {
    next({ name: "media" });
  } else {
    next();
  }
});

export default router;
