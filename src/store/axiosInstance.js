import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
  });
  axiosInstance.interceptors.request.use((request) => {
    const Token = localStorage.getItem('Token')
    if(Token){
      request.headers.Authorization = `Token ${Token}`
    }
    return request
  })
  axiosInstance.interceptors.response.use((response) => response.data)
  export default axiosInstance
