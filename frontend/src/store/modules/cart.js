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
      addToCart({ commit }, product) {
        commit('ADD_TO_CART', product)
      },
      increaseQty({ commit }, productId) {
        commit('INCREASE_QTY', productId)
      },
      decreaseQty({ commit }, productId) {
        commit('DECREASE_QTY', productId)
      },
      removeFromCart({ commit }, productId) {
        commit('REMOVE_FROM_CART', productId)
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
  