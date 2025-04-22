<template>
  <div class="products-wrapper">
    <!-- Wrapper Row -->
<div class="top-actions-row">
  <!-- Filter Button -->
  <div class="top-bar">
    <button @click="toggleFilters" class="filter-toggle-btn">
      <i class="fas fa-sliders-h"></i> Filters
    </button>
  </div>

  <!-- Most Bought Toggle Button -->
  <div class="toggle-most-bought-wrapper">
    <button @click="toggleMostBought" class="toggle-most-bought-btn">
      {{ showMostBought ? 'Hide' : 'Show' }} Most Bought Products
    </button>
  </div>
</div>


    <!-- Filter Sidebar as overlay above product list -->
    <transition name="fade">
      <div v-if="showFilters" class="filter-overlay">
        <FilterSidebar @close="toggleFilters" />
      </div>
    </transition>


    <!-- Most Bought Products Section -->
    <!-- <MostBought v-if="showMostBought" /> -->
     <!-- Most Bought Products Section -->
     <div v-if="showMostBought" class="most-bought-products">
      <h3 class="most-bought-title">Most Bought Products</h3>
      <div class="most-bought-grid">
      <div v-for="item in mostBoughtProducts" :key="item.id" class="most-bought-item">
        <img :src="item.image" alt="product" class="most-bought-image" />
        <div class="most-bought-details">
          <h4 class="most-bought-title">{{ item.title }}</h4>
          <p class="most-bought-price">${{ item.price }}</p>
        </div>
      </div>
      </div>
    </div>


    <h2 class="section-title">Featured Products</h2>
    <div class="product-grid">
      <div
        v-for="product in displayedProducts"
        :key="product.id"
        class="product-card"
      >
        <img :src="product.image" alt="product" class="product-image" />
        <div class="product-details">
          <h3 class="product-title">{{ product.title }}</h3>
          <p class="product-category">{{ product.category }}</p>
          <div class="product-price-badge">
            <span class="product-price">${{ product.price }}</span>
            <span
              :class="['price-badge', product.onSale ? 'on-sale' : 'regular-price']"
            >
              {{ product.onSale ? 'On Sale' : 'Regular Price' }}
            </span>
          </div>
          <button @click="addToCart(product)" class="add-to-cart-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted,computed} from 'vue'
import { useStore } from 'vuex'
import FilterSidebar from '../components/FilterSideBar.vue'
// import MostBought from '../components/MostBought.vue'

// const searchTerm = ref('')
const store = useStore()
// const filteredProducts = computed(() => {
  //   if (!searchTerm.value.trim()) return []
  //   const term = searchTerm.value.toLowerCase()
  //   return products.value.filter((p) =>
  //     p.title.toLowerCase().includes(term) ||
  //     p.category.toLowerCase().includes(term)
  //   )
  // })
  
const showFilters = ref(false)
const toggleFilters = () => {
  showFilters.value = !showFilters.value
}

const products = computed(() => store.getters['products/allProducts'] || [])
onMounted(() => {
  // console.log('Component is mounted');
  store.dispatch('products/fetchProducts')
  // console.log('Component is ready');
})

const filtered = computed(() => {
  const searchQuery = store.getters['filters/searchQuery'] || ''
  const selectedCategory = store.getters['filters/selectedCategory'] || ''
  const minPrice = store.getters['filters/minPrice']
  const maxPrice = store.getters['filters/maxPrice']

  return products.value.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      selectedCategory === '' ||
      product.category === selectedCategory

    const matchesSearch = product.title?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPrice = product.price >= minPrice && product.price <= maxPrice

    return matchesCategory && matchesSearch && matchesPrice
  })
})

const displayedProducts = computed(() => filtered.value)




const showMostBought = ref(false)

const toggleMostBought = () => {
  showMostBought.value = !showMostBought.value
}

const addToCart = (product) => {
  store.dispatch('cart/addToCart', product)
  alert(`Added "${product.title}" to cart!`)
}



// console.log(products)


//  const products = ref([
//    {
//      id: 1,
//      title: 'Smart Watch',
//      price: 199.99,
//      image: 'https://via.placeholder.com/400x300',
//      category: 'Electronics',
//      onSale: true,
//    },
//    {
//      id: 2,
//      title: 'Running Shoes',
//      price: 89.99,
//      image: 'https://via.placeholder.com/400x300',
//      category: 'Footwear',
//      onSale: false,
//    },
//    {
//      id: 3,
//      title: 'Leather Wallet',
//      price: 45.0,
//      image: 'https://via.placeholder.com/400x300',
//      category: 'Accessories',
//      onSale: true,
//    },
//    {
//      id: 4,
//      title: 'Noise Cancelling Headphones',
//      price: 299.99,
//      image: 'https://via.placeholder.com/400x300',
//      category: 'Audio',
//      onSale: false,
//    },
//  ])


// Data for Most Bought Products
const mostBoughtProducts = ref([
  {
    id: 1,
    title: 'AirPods Pro',
    price: 249.99,
    image: 'https://via.placeholder.com/150x150',
  },
  {
    id: 2,
    title: 'Nike Air Max',
    price: 129.99,
    image: 'https://via.placeholder.com/150x150',
  },
  {
    id: 3,
    title: 'Fitbit Charge 5',
    price: 179.99,
    image: 'https://via.placeholder.com/150x150',
  },
  {
    id: 3,
    title: 'Charger',
    price: 70.99,
    image: 'https://via.placeholder.com/150x150',
  },
])



// onMounted(() => {
//   store.dispatch('product/fetchMostBought')
//   store.dispatch('loadProducts')
//   setInterval(() => store.dispatch('product/fetchMostBought'), 10000)
// })
</script>

<style scoped>
.products-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem;
  position:relative;
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: #1d4ed8;
  margin-bottom: 2rem;
}

.product-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.product-card {
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.product-card:hover {
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

.product-price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #2563eb;
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

.toggle-most-bought-wrapper {
  text-align: end;
}

.toggle-most-bought-btn {
  background-color: #4f46e5;
  color: white;
  padding: 0.6rem 1.25rem;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.toggle-most-bought-btn:hover {
  background-color: #4338ca;
}
.most-bought-products {
  margin-top: 2rem;
}

.most-bought-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: #1d4ed8;
  margin-bottom: 2rem;
}

.most-bought-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.most-bought-item {
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.most-bought-item:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.most-bought-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.most-bought-details {
  padding: 1rem;
}

.most-bought-details h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.most-bought-price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #2563eb;
}

.top-bar {
  display: flex;
  justify-content: flex-end;
}

.filter-toggle-btn {
  background-color: #1d4ed8;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-overlay {
  position: absolute;
  top: 60px;
  right: 0;
  z-index: 50;
  width: 100%;
  max-width: 300px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.top-actions-row {
  display: flex;
  justify-content: flex-end; /* Align buttons to the right */
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
}

.top-bar,
.toggle-most-bought-wrapper {
  flex-shrink: 0;
}

.filter-toggle-btn,
.toggle-most-bought-btn {
  padding: 8px 14px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter-toggle-btn:hover,
.toggle-most-bought-btn:hover {
  background-color: #1e40af;
}



</style>
