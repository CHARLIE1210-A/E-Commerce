<template>
    <div class="cart-container">
      <h2 class="cart-title">Your Shopping Cart</h2>
  
      <div v-if="cartItems.length" class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image_url" class="cart-image" />
          <div class="cart-info">
            <h3>{{ item.title }}</h3>
            <p>${{ item.price }} x {{ item.quantity }}</p>
            <div class="cart-controls">
              <button @click="decreaseQty(item.id)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQty(item.id)">+</button>
              <button class="remove-btn" @click="removeItem(item.id)">Remove</button>
            </div>
          </div>
        </div>
        <div class="cart-summary">
          <p>Total: ${{ cartTotal.toFixed(2) }}</p>
          <button class="checkout-btn" @click="checkout">Proceed to Checkout</button>
        </div>
      </div>
  
      <div v-else class="empty-cart">Your cart is empty.</div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  
  const store = useStore()
  const cartItems = computed(() => store.state.cart.cartItems)
  const cartTotal = computed(() => store.getters['cart/cartTotal'])
  
  const increaseQty = (id) => store.dispatch('cart/increaseQty', id)
  const decreaseQty = (id) => store.dispatch('cart/decreaseQty', id)
  const removeItem = (id) => store.dispatch('cart/removeFromCart', id)
  const checkout = () => {
    alert('Checkout successful!')
    store.dispatch('cart/clearCart')
  }
  </script>

<style scoped>
.cart-container {
  padding: 20px;
  max-width: 900px;
  margin: auto;
}
.cart-title {
  font-size: 24px;
  margin-bottom: 20px;
}
.cart-items {
  border-top: 1px solid #ccc;
}
.cart-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}
.cart-image {
  width: 100px;
  height: 80px;
  object-fit: cover;
  margin-right: 20px;
}
.cart-info {
  flex: 1;
}
.cart-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}
.cart-controls button {
  padding: 4px 8px;
}
.remove-btn {
  color: red;
  margin-left: auto;
}
.cart-summary {
  margin-top: 20px;
  text-align: right;
}
.checkout-btn {
  padding: 10px 20px;
  background: green;
  color: white;
  border: none;
  border-radius: 6px;
}
.empty-cart {
  text-align: center;
  font-size: 18px;
  color: gray;
}

</style>