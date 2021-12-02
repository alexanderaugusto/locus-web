import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_POSITION_STACK_API_URL
})

api.interceptors.request.use(config => {
  config.params = config.params || {}
  config.params.access_key = process.env.NEXT_PUBLIC_POSITION_STACK_ACCESS_KEY
  return config
})

export default api
