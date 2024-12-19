/* eslint-disable prettier/prettier */
import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/pypView.vue";
// import AboutView from "../views/AboutView.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: '/about',
        name: "AboutView",
        components: { default: () => import('@/views/AboutView') },
      },

    // {
    //     path: "/about",
    //     name: "about",
    //     // component: AboutView,
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () =>
    //         import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    // },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
