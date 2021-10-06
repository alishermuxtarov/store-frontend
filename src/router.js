import Vue from 'vue'
import Router from 'vue-router'
import {
    isLoggedIn
} from './components/shared/service/authService'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        name: 'products',
        component: () => import('./views/Products.vue')
    },
    {
        path: '/products/:id',
        name: 'productDetails',
        component: () => import('./components/products/ProductDetail.vue')
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('./components/products/cart/CartProducts.vue'),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next()
            } else {
                next({
                    name: 'Login.vue',
                    query: {
                        from: to.name
                    }
                })
            }
        }
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: () => import('./components/products/cart/Checkout.vue'),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next()
            } else {
                next({
                    name: 'Login.vue',
                    query: {
                        from: to.name
                    }
                })
            }
        }
    },
    {
        path: '/login',
        name: 'Login.vue',
        component: () => import('./views/Login.vue')
    }
    ]
})
