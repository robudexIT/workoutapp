import { createRouter, createWebHistory } from "vue-router";

import HomePage  from './pages/HomePage.vue'

const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes: [
       {path: '/', component: HomePage}
    ]
})

export default router