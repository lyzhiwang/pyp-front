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
    {
        path: '/510',
        component: () => import('@/views/510'),
        meta: {
            title: ''
        },
        hidden: true
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
