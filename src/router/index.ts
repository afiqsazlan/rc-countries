import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import CountryShowView from '@/views/CountryShowView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {layout: AppLayout}
        },
        {
            path: '/:country',
            name: 'countries.show',
            component: CountryShowView,
            meta: {layout: AppLayout}
        },
    ]
})

export default router
