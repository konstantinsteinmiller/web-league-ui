import { createWebHistory, createRouter } from "vue-router";
import Schedule from "@/views/Schedule.vue";
import Leaderboard from "@/views/Leaderboard.vue";
import PageNotFound from "@/views/PageNotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: 'Schedule',
  },
  {
    path: "/schedule",
    name: "Schedule",
    component: Schedule,
  },
  {
    path: "/Leaderboard",
    name: "Leaderboard",
    component: Leaderboard,
  },
  {
    path: "/:catchAll(.*)",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;