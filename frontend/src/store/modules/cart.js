import api from '../../services/api'

export default {
    namespaced: true,
  
    state: {
      cartItems: [],
    },
  
    mutations: {
      ADD_TO_CART(state, product) {
        const item = state.cartItems.find(p => p.id === product.id)
        if (item) {
          item.quantity++
        } else {
          state.cartItems.push({ ...product, quantity: 1 })
        }
      },
  
      INCREASE_QTY(state, productId) {
        const item = state.cartItems.find(p => p.id === productId)
        if (item) item.quantity++
      },
  
      DECREASE_QTY(state, productId) {
        const item = state.cartItems.find(p => p.id === productId)
        if (item && item.quantity > 1) {
          item.quantity--
        } else {
          state.cartItems = state.cartItems.filter(p => p.id !== productId)
        }
      },
  
      REMOVE_FROM_CART(state, productId) {
        state.cartItems = state.cartItems.filter(p => p.id !== productId)
      },
  
      CLEAR_CART(state) {
        state.cartItems = []
      },
    },
  
    actions: {
      async addToCart({ commit }, product) {
        commit('ADD_TO_CART', product)

        try {
          const userId = 1// or from auth state
          await api.post('/cart/add/', {
            user_id: userId,
            product_id: product.id,
            quantity: 1,
          })
        } catch (error) {
          console.error('Error syncing cart to backend:', error)
        }
      },

      async increaseQty({ commit }, productId) {
        commit('INCREASE_QTY', productId)

        try {
          await api.post(`/cart/${productId}/update/`, { action: 'increase' })
        } catch (error) {
          console.error('Failed to increase quantity:', error)
        }
      },

      async decreaseQty({ commit }, productId) {
        commit('DECREASE_QTY', productId)

        try {
          await api.post(`/cart/${productId}/update/`, { action: 'decrease' })
        } catch (error) {
          console.error('Failed to decrease quantity:', error)
        }
      },

      async removeFromCart({ commit }, productId) {
        commit('REMOVE_FROM_CART', productId)

        try {
          await api.delete(`/cart/${productId}/delete/`)
        } catch (error) {
          console.error('Failed to remove product from cart:', error)
        }
      },

      clearCart({ commit }) {
        commit('CLEAR_CART')
      },
    },
  
    getters: {
      cartItemCount: state => {
        return state.cartItems.reduce((total, item) => total + item.quantity, 0)
      },
      cartTotal: state => {
        return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
      },
    },
  }
  