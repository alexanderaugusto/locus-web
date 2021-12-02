import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ZIPCODE_API_URL
})

export default api
