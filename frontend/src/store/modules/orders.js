import { createOrder, fetchOrders, cancelOrder ,fetchTopProducts} from '../../services/orderService';

const state = {
  orders: [],
  topProducts: [],
  loading: false,
  error: null,
};

const getters = {
  orders: (state) => state.orders,
  topProducts: (state) => state.topProducts,
  isLoading: (state) => state.loading,
  error: (state) => state.error,
};

const actions = {
  async fetchOrders({ commit }, userId) {
    commit('setLoading', true);
    commit('setError', null);

    try {
      const data = await fetchOrders(userId);
      commit('setOrders', data);
    } catch (err) {
      commit('setError', err.message);
    } finally {
      commit('setLoading', false);
    }
  },

  async createOrder({ commit }, orderData) {
    commit('setLoading', true);
    commit('setError', null);

    try {
      const data = await createOrder(
        orderData.userId,
        orderData.productId,
        orderData.quantity,
        orderData.paymentMode
      );
      commit('addOrder', data);
    } catch (err) {
      commit('setError', err.message);
    } finally {
      commit('setLoading', false);
    }
  },

  async cancelOrder({ commit }, orderId) {
    commit('setLoading', true);
    commit('setError', null);

    try {
    //   const data = await cancelOrder(orderId);
      await cancelOrder(orderId);
      commit('removeOrder', orderId);
    } catch (err) {
      commit('setError', err.message);
    } finally {
      commit('setLoading', false);
    }
  },

  async fetchTopProducts({ commit }) {
    commit('setLoading', true);
    commit('setError', null);

    try {
      const data = await fetchTopProducts();
      commit('setTopProducts', data);
    } catch (err) {
      commit('setError', err.message);
    } finally {
      commit('setLoading', false);
    }
  },
};

const mutations = {
  setLoading(state, isLoading) {
    state.loading = isLoading;
  },
  setError(state, error) {
    state.error = error;
  },
  setOrders(state, orders) {
    state.orders = orders;
  },
  addOrder(state, order) {
    state.orders.push(order);
  },
  removeOrder(state, orderId) {
    state.orders = state.orders.filter((order) => order.id !== orderId);
  },
  setTopProducts(state, topProducts) {
    state.topProducts = topProducts; 
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
