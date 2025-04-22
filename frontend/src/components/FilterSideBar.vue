<template>
    <div class="filter-sidebar">
      <div class="filter-close-btn" @click="$emit('close')">
        ✕
      </div>
      <h2 class="filter-title">
        <i class="fas fa-filter"></i> Filters
      </h2>
  
      <!-- Search Input -->
      <div class="filter-group">
        <label>Search</label>
        <div class="search-wrapper">
          <input
            v-model="searchText"
            @input="debouncedSearch"
            type="text"
            placeholder="Search products..."
          />
          <i class="fas fa-search search-icon"></i>
        </div>
      </div>
  
      <!-- Category Filter -->
      <div class="filter-group">
        <label>Category</label>
        <ul class="category-list">
          <li
            v-for="cat in categories"
            :key="cat"
            :class="{ active: selectedCategory === cat }"
            @click="selectCategory(cat)"
          >
            {{ cat }}
          </li>
        </ul>
      </div>
  
      <!-- Price Range -->
      <div class="filter-group">
        <label>Price Range</label>
        <div class="price-range">${{ minPrice }} - ${{ maxPrice }}</div>
        <input
          type="range"
          :min="range[0]"
          :max="range[1]"
          v-model.number="maxPrice"
          @input="updatePrice"
        />
      </div>
      <div>
        <button @click="resetAllFilters">Reset Filters</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue'
  import { useStore } from 'vuex'
  import debounce from 'lodash.debounce'
  
  const store = useStore()
  const categories = computed(() => store.getters['filters/categories'])
  const range = computed(() => store.getters['filters/priceRange'])
  
  const selectedCategory = ref('All')
  const minPrice = ref(range.value[0])
  const maxPrice = ref(range.value[1])
  const searchText = ref('')
  
  const updateFilters = () => {
    store.dispatch('filters/applyFilters', {
      category: selectedCategory.value,
      minPrice: minPrice.value,
      maxPrice: maxPrice.value,
      search: searchText.value
    })
  }
  
  const selectCategory = (cat) => {
    selectedCategory.value = cat
    updateFilters()
  }
  
  const updatePrice = () => {
    updateFilters()
  }
  
  const debouncedSearch = debounce(updateFilters, 500)
  
  watch(range, ([min, max]) => {
    minPrice.value = min
    maxPrice.value = max
  })

  watch(() => store.getters['filters/selectedCategory'], val => {
    selectedCategory.value = val
  })

  watch(() => store.getters['filters.minPrice'], val => {
    minPrice.value = val
  })

  watch(() => store.getters['filters.maxPrice'], val => {
    maxPrice.value = val
  })

  watch(() => store.getters['filters.searchQuery'], val => {
    searchText.value = val
  })

  const resetAllFilters = () => {
  store.dispatch('filters/resetFilters')
  selectedCategory.value = 'All'
  minPrice.value = range.value[0]
  maxPrice.value = range.value[1]
  searchText.value = ''
  updateFilters()
}
  </script>
  
  <style scoped>
  .filter-sidebar {
    width: 100%;
    max-width: 280px;
    padding: 20px;
    border-radius: 16px;
    background: #ffffff;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 20px;
  }
  
  .filter-title {
    font-size: 20px;
    font-weight: 600;
    color: #333;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 24px;
  }
  
  .filter-group {
    margin-bottom: 24px;
  }
  
  .filter-group label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    color: #555;
  }
  
  .search-wrapper {
    position: relative;
  }
  
  .search-wrapper input {
    width: 100%;
    padding: 10px 36px 10px 12px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  .search-icon {
    position: absolute;
    right: 10px;
    top: 10px;
    color: #888;
  }
  
  .category-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .category-list li {
    padding: 8px 12px;
    margin-bottom: 6px;
    border-radius: 6px;
    background-color: #f3f3f3;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .category-list li:hover {
    background-color: #e0e7ff;
    color: #1e40af;
  }
  
  .category-list li.active {
    background-color: #dbeafe;
    color: #1d4ed8;
    font-weight: 600;
  }
  
  .price-range {
    font-size: 13px;
    color: #666;
    margin-bottom: 6px;
  }
  
  input[type="range"] {
    width: 100%;
    accent-color: #2563eb;
  }
  </style>
  