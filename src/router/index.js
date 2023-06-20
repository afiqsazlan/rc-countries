import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AppLayout from '@/layouts/App/AppLayout.vue'
import CountryShowView from '@/views/CountryShowView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                layout: AppLayout,
                title: `${import.meta.env.VITE_APP_NAME} - Home`
            }
        },
        {
            path: '/countries/:country',
            name: 'countries.show',
            component: CountryShowView,
            meta: {
                layout: AppLayout,
                title: `${import.meta.env.VITE_APP_NAME} - Country`
            },
        },
    ]
})

router.beforeEach((to, from, next) => {
    const title = to.meta.title
    if (title) {
        document.title = title
    }
    next()
})

export default router
