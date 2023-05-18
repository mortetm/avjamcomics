import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import ShopView from "@/views/ShopView.vue";
import ComicView from "@/views/ComicView.vue";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/:comic",
    name: "tourbunny",
    component: ComicView,

    children: [
      {
        path: "latest",
        name: "latestcomic",
        component: ComicView,
      },
      {
        path: "comic/:id",
        name: "comic",
        component: ComicView,
      },
    ],
  },

  {
    path: "/about",
    name: "about",

    component: AboutView,
  },
  {
    path: "/shop",
    name: "shop",
    component: ShopView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
