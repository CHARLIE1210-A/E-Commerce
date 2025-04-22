// store/modules/filters.js
const state = () => ({
    selectedCategory: '',
    search: '',
    minPrice: 0,
    maxPrice: 1000,
    allCategories: ['All', 'Electronics', 'Footwear', 'Accessories', 'Audio'],
    priceRange: [0, 1000]
  })
  
  const getters = {
    selectedCategory: (state) => state.selectedCategory,
    searchQuery: (state) => state.search,
    priceRange: (state) => state.priceRange,
    minPrice: (state) => state.minPrice,
    maxPrice: (state) => state.maxPrice,
    categories: (state) => state.allCategories
  }
  
  const mutations = {
    SET_CATEGORY(state, category) {
      state.selectedCategory = category
    },
    SET_SEARCH(state, value) {
      state.search = value
    },
    SET_PRICE(state, { min, max }) {
      state.minPrice = min
      state.maxPrice = max
    },
    RESET_FILTERS(state) {
      state.selectedCategory = ''
      state.search = ''
      state.minPrice = state.priceRange[0]
      state.maxPrice = state.priceRange[1]
    }
  }
  
  const actions = {
    applyFilters({ commit }, filters) {
      commit('SET_CATEGORY', filters.category)
      commit('SET_SEARCH', filters.search)
      commit('SET_PRICE', {
        min: filters.minPrice,
        max: filters.maxPrice
      })
      // You can also call a fetch action for filtered products here
    },
    resetFilters({ commit }) {
      commit('RESET_FILTERS')
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  }
  