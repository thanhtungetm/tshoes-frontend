import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
    }, {
        path: '/brand/:name/:id',
        name: 'Brand',
        component: () => import('../views/Brand.vue')
    },
    {
        path: '/product/:id',
        name: 'ProductDetail',
        component: () => import('../views/DetailProduct.vue')
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/Cart.vue')
    },
    {
        path: '/order',
        name: 'Order',
        component: () => import('../views/Order.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'PageNotFound',
        component: () => import('../views/ErrorNotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        if (savedPosition) {
            return { savedPosition }
        }
        return { top: 0 }
    },
})



export default router