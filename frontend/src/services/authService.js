// services/authService.js
import axios from 'axios'

// const BASE_URL = 'http://127.0.0.1:8000/api'  // adjust if needed
const BASE_URL =  'https://e-commerce-f5fw.onrender.com/api' || 'http://localhost:8000/api'
export function loginWithOTP(mobile) {
  return axios.post(`${BASE_URL}/auth/login/`, { mobile })
}

export function verifyOTP(mobile, otp) {
  return axios.post(`${BASE_URL}/auth/verify/`, { mobile, otp })
}
