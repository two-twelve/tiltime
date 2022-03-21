import { createWebHistory, createRouter } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/:catchAll(.*)",
    redirect: { name: "Home" }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;