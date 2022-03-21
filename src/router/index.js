import { createWebHistory, createRouter } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import SettingsView from "@/views/SettingsView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/settings",
    name: "Settings",
    component: SettingsView,
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