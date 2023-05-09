import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import ContactUsView from "../views/ContactUsView.vue";
import ComicView from "../views/ComicView.vue";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/latest",
    name: "latestcomic",
    component: ComicView,
  },
  {
    path: "/comic/:id",
    name: "comic",
    component: ComicView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactUsView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
