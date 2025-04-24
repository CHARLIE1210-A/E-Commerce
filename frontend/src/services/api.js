import axios from 'axios'

const api = axios.create({
  baseURL:  'https://e-commerce-f5fw.onrender.com/api/' || 'http://localhost:8000/api',
  // baseURL: 'http://localhost:8000/api',
  // baseURL:  'https://e-commerce-f5fw.onrender.com/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
