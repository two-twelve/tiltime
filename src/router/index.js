import { createWebHistory, createRouter } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import SettingsView from "@/views/SettingsView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
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