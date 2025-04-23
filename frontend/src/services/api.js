import axios from 'axios'

const api = axios.create({
  baseURL:  'http://localhost:8000/api' || 'https://e-commerce-f5fw.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
