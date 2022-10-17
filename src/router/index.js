import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/quiz",
    name: "Quiz",
    component: () =>
      import(/* webpackChunkName: "quiz" */ "../views/Quiz.vue"),
  },
  {
    path: "/results",
    name: "Results",
    component: () =>
      import(/* webpackChunkName: "result" */ "../views/Results.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
