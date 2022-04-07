import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/search  ",
        name: "search   ",

        component: () =>
            import(/* webpackChunkName: "about" */ "../views/SearchView.vue"),
    },
    // {
    //     path: "/nouveau",
    //     name: "Nouveau",
    //     component: () =>
    //         import(/* webpackChunkName: "novueau" */ "../views/Nouveau.vue"),
    // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
