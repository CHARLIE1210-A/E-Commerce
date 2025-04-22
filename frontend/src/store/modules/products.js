// store/modules/product.js

import axios from 'axios'

const state = () => ({
  products: [],
  loading: false,
  error: null,
})

const getters = {
  allProducts: (state) => state.products || [],
  isLoading: (state) => state.loading,
  hasError: (state) => !!state.error,
}

const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  SET_LOADING(state, value) {
    state.loading = value
  },
  SET_ERROR(state, error) {
    state.error = error
  },
}

const actions = {
  async fetchProducts({ commit }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      // console.log('About to call API')
      const res = await axios.get('http://localhost:8000/api/products/')
      console.log('Fetched data:', res.data)
      commit('SET_PRODUCTS', res.data)
    } catch (err) {
      if (err.response) {
        // The request was made, but the server responded with a status code other than 2xx
        commit('SET_ERROR', `API error: ${err.response.data.message || 'Failed to fetch products'}`)
      } else if (err.request) {
        // The request was made, but no response was received
        commit('SET_ERROR', 'Network error: No response from the server.')
      } else {
        // Something else happened in setting up the request
        commit('SET_ERROR', `Error: ${err.message}`)
      }
    } finally {
      commit('SET_LOADING', false)
    }
  },
}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
