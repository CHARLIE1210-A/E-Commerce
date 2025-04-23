// src/services/orderService.js
import api from './api';

// Fetch orders for a user
export const fetchOrders = async (userId) => {
  try {
    const response = await api.get(`/orders/`, {
      params: {
        user_id: userId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Create an order
export const createOrder = async (userId, productId, quantity, paymentMode) => {
  try {
    const response = await api.post('/orders/create/', {
      user_id: userId,
      product_id: productId,
      quantity,
      payment_mode: paymentMode,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Cancel an order
export const cancelOrder = async (orderId) => {
  try {
    const response = await api.post(`/orders/${orderId}/cancel/`);
    return response.data;
  } catch (error) {
    console.error('Error canceling order:', error);
    throw error;
  }
};

// Fetch top products
export const fetchTopProducts = async () => {
    try {
      const response = await api.get('orders/top-products/');
      console.log('Top products:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching top products:', error);
      throw error;
    }
  };
