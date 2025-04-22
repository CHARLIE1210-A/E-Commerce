// store/models/product.js
export default {
    namespaced: true,
    state: () => ({
      mostBought: []
    }),
    mutations: {
      SET_MOST_BOUGHT(state, products) {
        state.mostBought = products
      }
    },
    actions: {
      fetchMostBought({ commit }) {
        // Simulated API call
        const orderedProducts = [
          {
            id: 4,
            title: 'Noise Cancelling Headphones',
            price: 299.99,
            image: 'https://via.placeholder.com/400x300',
            orderCount: 127
          },
          {
            id: 1,
            title: 'Smart Watch',
            price: 199.99,
            image: 'https://via.placeholder.com/400x300',
            orderCount: 105
          },
          {
            id: 2,
            title: 'Running Shoes',
            price: 89.99,
            image: 'https://via.placeholder.com/400x300',
            orderCount: 87
          }
        ]
  
        commit('SET_MOST_BOUGHT', orderedProducts.sort((a, b) => b.orderCount - a.orderCount).slice(0, 4))
      }
    },
    getters: {
      mostBought: state => state.mostBought
    }
  }
  