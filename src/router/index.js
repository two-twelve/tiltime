import { createWebHistory, createRouter } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/:catchAll(.*)",
    redirect: { name: "home" }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;