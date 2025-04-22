<template>
    <div class="most-bought-section">
      <h2 class="most-bought-title">Most Bought Products</h2>
      <div class="most-bought-grid">
        <div
          v-for="product in mostBought"
          :key="product.id"
          class="most-bought-card"
        >
          <img :src="product.image" alt="product" class="product-image" />
          <h3 class="product-title">{{ product.title }}</h3>
          <p class="product-price">${{ product.price }}</p>
          <p class="product-count">Bought: {{ product.orderCount }} times</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  
  const store = useStore()
  const mostBought = computed(() => store.getters['product/mostBought'])
  </script>
  
  <style scoped>
  .most-bought-section {
    margin-top: 2rem;
    padding: 0 1rem;
  }
  
  .most-bought-title {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    color: #4f46e5; /* Indigo */
    margin-bottom: 1.5rem;
  }
  
  .most-bought-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
  
  .most-bought-card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    padding: 1rem;
    transition: box-shadow 0.3s ease;
  }
  
  .most-bought-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .product-image {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: 0.25rem;
    margin-bottom: 0.75rem;
  }
  
  .product-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1f2937; /* Gray-800 */
    margin-bottom: 0.25rem;
  }
  
  .product-price {
    color: #2563eb; /* Blue-600 */
    font-weight: bold;
    margin-bottom: 0.25rem;
  }
  
  .product-count {
    font-size: 0.875rem;
    color: #6b7280; /* Gray-500 */
  }
  </style>
  