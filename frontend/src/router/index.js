import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/HomePage.vue'
import ProductList from '../views/ProductList.vue'
// import ProductDetail from '../views/ProductDetail.vue'
import Cart from '../views/CartPage.vue'
// import Checkout from '../views/Checkout.vue'
// import Orders from '../views/Orders.vue'
import Login from '../views/LoginPage.vue'
// import NotFound from '../views/NotFound.vue'

const routes = [
  { path: '/', component: ProductList },
  // { path: '/products', component: ProductList },
  // { path: '/products/:id', component: ProductDetail },
  { path: '/cart', component: Cart },
  // { path: '/checkout', component: Checkout },
  // { path: '/orders', component: Orders },
  { path: '/login', component: Login },
  // { path: '/:pathMatch(.*)*', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
