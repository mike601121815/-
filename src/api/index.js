import axios from 'axios'
const DEFAULT_OPTIONS = {
  // timeout: 10000,
  responseType: 'json',
  withCredentials: false, // 是否允许带cookie
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
}

const Axios = axios.create(DEFAULT_OPTIONS)
/**
 * 响应时拦截
 */
Axios.interceptors.response.use(
  response => {
      return response.data
  },
  error => {
    console.error(error)
    layer.close(layerLoading)
  }
)

export default Axios