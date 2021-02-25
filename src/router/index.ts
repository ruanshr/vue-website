import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "@/views/404/index.vue";
import Login from "@/views/Login/index.vue";
import Post from "@/views/Post/index.vue";
import Swiper from "@/views/Swiper/index.vue";
import Partner from "@/views/Partner/index.vue";
import Team from "@/views/Team/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: "/post",
    children: [
      {
        path: "/post",
        name: "Post",
        component: Post
      },
      {
        path: "/swiper",
        name: "Swiper",
        component: Swiper
      },
      {
        path: "/partner",
        name: "Partner",
        component: Partner
      },
      {
        path: "/team",
        name: "Team",
        component: Team
      },
      {
        path: "/keyword",
        name: "Keyword",
        component: () => import("@/views/Keyword/index.vue")
      },
      {
        path: "/pagesmanager",
        name: "PagesManager",
        component: () => import("@/views/PagesManager/index.vue")
      },
      {
        path: "/siteinfo",
        name: "SiteInfo",
        component: () => import("@/views/SiteInfo/index.vue")
      },
      {
        path: "/companyinfo",
        name: "CompanyInfo",
        component: () => import("@/views/CompanyInfo/index.vue")
      },
      {
        path: "/solution",
        name: "Solution",
        component: () => import("@/views/Solution/index.vue")
      },
      {
        path: "/aboutme",
        name: "Aboutme",
        component: () => import("@/views/Aboutme/index.vue")
      },
      {
        path: "/user",
        name: "User",
        component: () => import("@/views/User/index.vue")
      },
      {
        path: "/404",
        name: "404",
        component: NotFound
      },
      {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
