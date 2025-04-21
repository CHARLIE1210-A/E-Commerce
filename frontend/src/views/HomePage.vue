<template>
    <div class="home-page">
      <SearchBar @search="handleSearch" />
  
      <div class="layout">
        <FilterSidebar
          :categories="categories"
          :selectedCategory="selectedCategory"
          @filter-category="handleCategory"
          @filter-price="handlePrice"
          :min="0"
          :max="maxPrice"
        />
  
        <div class="main-content">
          <MostBought />
          <h2>All Products</h2>
          <div class="products-grid">
            <ProductCard
              v-for="product in filteredProducts"
              :key="product.id"
              :product="product"
              @add-to-cart="addToCart"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapState } from 'vuex'
//   import ProductCard from '@/components/ProductCard.vue'
//   import MostBought from '@/components/MostBought.vue'
//   import FilterSidebar from '@/components/FilterSidebar.vue'
//   import SearchBar from '@/components/SearchBar.vue'
  
  export default {
    components: {
    //   ProductCard,
    //   MostBought,
    //   FilterSidebar,
    //   SearchBar
    },
    data() {
      return {
        searchText: '',
        selectedCategory: null,
        priceLimit: 10000
      }
    },
    computed: {
      ...mapState('product', ['products', 'categories']),
      maxPrice() {
        return Math.max(...this.products.map(p => p.price))
      },
      filteredProducts() {
        return this.products.filter(p => {
          const matchCategory = this.selectedCategory ? p.category === this.selectedCategory : true
          const matchSearch = this.searchText
            ? p.title.toLowerCase().includes(this.searchText.toLowerCase())
            : true
          const matchPrice = p.price <= this.priceLimit
          return matchCategory && matchSearch && matchPrice
        })
      }
    },
    created() {
      this.fetchProducts()
      this.fetchCategories()
    },
    methods: {
      ...mapActions('product', ['fetchProducts', 'fetchCategories']),
      ...mapActions('cart', ['addToCart']),
      handleSearch(query) {
        this.searchText = query
      },
      handleCategory(category) {
        this.selectedCategory = category
      },
      handlePrice(price) {
        this.priceLimit = price
      }
    }
  }
  </script>
  
  <style scoped>
  .home-page {
    padding: 1rem;
  }
  .layout {
    display: flex;
  }
  .main-content {
    flex: 1;
    padding-left: 1rem;
  }
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
  }
  </style>
  