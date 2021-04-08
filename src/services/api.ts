import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

const STORAGE_URL = process.env.NEXT_PUBLIC_API_STORAGE

export default api

export { STORAGE_URL }
