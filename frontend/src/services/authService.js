// services/authService.js
import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api'  // adjust if needed

export function loginWithOTP(mobile) {
  return axios.post(`${BASE_URL}/auth/login/`, { mobile })
}

export function verifyOTP(mobile, otp) {
  return axios.post(`${BASE_URL}/auth/verify/`, { mobile, otp })
}
