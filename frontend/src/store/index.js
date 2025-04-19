import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    categories: [],
    cart: [],
    searchQuery: '',
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    ADD_TO_CART(state, product) {
      state.cart.push(product);
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      const res = await axios.get('http://localhost:8000/api/products/');
      commit('SET_PRODUCTS', res.data);
    },
    async fetchCategories({ commit }) {
      const res = await axios.get('http://localhost:8000/api/categories/');
      commit('SET_CATEGORIES', res.data);
    },
  },
  getters: {
    filteredProducts: (state) => {
      return state.products.filter(p => 
        p.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }
  }
});
