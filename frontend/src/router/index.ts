import {createRouter, createWebHistory} from 'vue-router';
import { currentUserStore } from '../stores/userStore';

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {auth: false},
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/about',
        name: 'About',
        meta: {auth: false},
        component: () => import('../views/AboutView.vue')
    },
    {
        path: '/store/:categoryId?',
        name: 'store',
        meta: {auth: false},
        component: () => import('../views/StoreView.vue')
      },
      {
        path:'/categories',
        name:'categories',
        meta: {auth: false},
        component: () => import('../views/CategoryView.vue')
      },
      {
        path: '/contact',
        name: 'contact',
        meta: {auth: false},
        component: () => import('../views/ContactView.vue')
      },
      {
        path: '/view-product/:id',
        name: 'view-product',
        meta: {auth: false},
        component: () => import('../views/ProductView.vue')
      },
      {
        path: '/cart',
        name: 'cart',
        meta: {auth: false},
        component: () => import('../views/CartView.vue')
      },
      {
        path: '/checkout',
        name: 'checkout',
        meta: {auth: true},
        component: () => import('../views/CheckoutView.vue')
      },
      {
        path: '/login',
        name: 'login',
        meta: {auth: false},
        component: () => import('../views/LoginView.vue')
      },
      {
        path: '/signup',
        name: 'signup',
        meta: {auth: false},
        component: () => import('../views/SignUpView.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        meta: {auth: true},
        component: () => import('../views/ProfileView.vue')
      },
      {
        path: '/orderhistory',
        name: 'orderhistory',
        meta: {auth: true},
        component: () => import('../views/OrdersView.vue')
      },
      {
        path: '/payment-success',
        name: 'payment-success',
        meta: {auth: true},
        component: () => import('../views/TransactionSuccessView.vue')
      },
      {
        path: '/admin',
        name: 'admin',
        meta: {auth: true},
        component: () => import('../views/AdminView.vue')
      },
      {
        path: '/edit-profile',
        name: 'edit-profile',
        meta: {auth: true},
        component: () => import('../views/EditProfileView.vue')
      },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
  const currentUser = currentUserStore();
    if (to.meta.auth) {
        if (!currentUser.loggedIn) {
            next({ name: 'login' });
        } else {
            if (currentUser.isAdmin && to.name === 'admin') {
                next({ name: 'admin' });
            }else{
                next({ name: 'Home' });
            }
        }
    } else {
        next()
    }
})
export default router
