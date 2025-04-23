<template>
  <div class="most-bought-section">
    <h2 class="most-bought-title">Most Bought Products</h2>
    <div class="most-bought-grid">
      <div
        v-for="product in mostBought"
        :key="product.id"
        class="most-bought-card"
      >
        <img :src="product.image_url" alt="product" class="product-image" />
        <div class="most-bought-details">
          <h3 class="product-title">{{ product.title }}</h3>
          <div class="product-price-badge">
            <span class="product-price">${{ product.price }}</span>
            <span
              :class="[
                'price-badge',
                product.onSale ? 'on-sale' : 'regular-price',
              ]"
            >
              {{ product.onSale ? "On Sale" : "Regular Price" }}
            </span>
          </div>
          <button @click="addToCart(product)" class="add-to-cart-btn">
            Add to Cart
          </button>
          <p class="product-count">
            <span class="label">Bought:</span>
            <span class="value">{{ product.total_quantity }}</span>
            <span class="label">  times</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

// Dispatch the fetchTopProducts action when component mounts
onMounted(() => {
  store.dispatch("fetchTopProducts");
});

// Access topProducts from Vuex store
const mostBought = computed(() => store.getters.topProducts);

const addToCart = (product) => {
  store.dispatch("cart/addToCart", product);
  alert(`Added "${product.title}" to cart!`);
};
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
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
.most-bought-details {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.most-bought-card {
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.most-bought-card:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-details {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.product-category {
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}
.product-price-badge {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}
.price-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
}
.on-sale {
  background-color: #dcfce7;
  color: #15803d;
}

.regular-price {
  background-color: #fee2e2;
  color: #b91c1c;
}
.product-price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #2563eb;
}
.product-count {
  font-size: 0.875rem;
  color: #6b7280; /* Gray-500 */
}

.add-to-cart-btn {
  margin-top: 1rem;
  background-color: #2563eb;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-to-cart-btn:hover {
  background-color: #1e40af;
}
.product-count {
  font-size: 0.9rem;
  color: #4b5563; /* Gray-600 */
}

.product-count .label {
  color: #6b7280; /* Gray-500 */
  font-weight: 500;
  margin-right: 2px;
}

.product-count .value {
  color: #6b7280; /* Green-500 */
  font-weight: bold;
}

</style>
