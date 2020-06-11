import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/more",
    name: "more",
    component: () => import(/* webpackChunkName: "more" */ "../views/More.vue"),
    beforeEnter(to, from, next) {
      if (to.params.city) next();
      else next("/");
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
