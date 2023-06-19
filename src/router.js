import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Home",
      path: "/",
      component: () => import("@/views/HomeView.vue"),
    },

    {
      name: "Product",
      path: "/products/:id",
      component: () => import("@/views/ProductView.vue"),
    },
  ],
});

export default router;
