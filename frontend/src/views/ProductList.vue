<template>
    <div class="container mx-auto px-6 py-8">
      <h2 class="text-3xl font-bold mb-6 text-center text-blue-700">Featured Products</h2>
  
      <div class="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white border rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
        >
          <!-- Product Image -->
          <img :src="product.image" alt="product" class="w-full h-48 object-cover" />
  
          <!-- Product Details -->
          <div class="p-4 flex flex-col flex-grow">
            <h3 class="text-lg font-semibold text-gray-800">{{ product.title }}</h3>
            <p class="text-sm text-gray-500 mb-1">{{ product.category }}</p>
            <div class="flex items-center justify-between mt-2">
              <span class="text-xl font-bold text-blue-600">${{ product.price }}</span>
              <span
                :class="[
                  'text-xs font-semibold px-2 py-1 rounded-full',
                  product.onSale ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                ]"
              >
                {{ product.onSale ? 'On Sale' : 'Regular Price' }}
              </span>
            </div>
  
            <!-- Add to Cart -->
            <button
              @click="addToCart(product)"
              class="mt-auto bg-blue-600 text-white text-sm font-medium rounded-lg py-2 px-4 hover:bg-blue-700 transition mt-4"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const products = ref([
    {
      id: 1,
      title: 'Smart Watch',
      price: 199.99,
      image: 'https://via.placeholder.com/400x300',
      category: 'Electronics',
      onSale: true,
    },
    {
      id: 2,
      title: 'Running Shoes',
      price: 89.99,
      image: 'https://via.placeholder.com/400x300',
      category: 'Footwear',
      onSale: false,
    },
    {
      id: 3,
      title: 'Leather Wallet',
      price: 45.0,
      image: 'https://via.placeholder.com/400x300',
      category: 'Accessories',
      onSale: true,
    },
    {
      id: 4,
      title: 'Noise Cancelling Headphones',
      price: 299.99,
      image: 'https://via.placeholder.com/400x300',
      category: 'Audio',
      onSale: false,
    },
    // Add more products if needed
  ])
  
  function addToCart(product) {
    alert(`Added "${product.title}" to cart!`)
  }
  </script>
  
  