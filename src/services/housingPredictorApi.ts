import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOUSING_PREDICTOR_API_URL
})

export default api
