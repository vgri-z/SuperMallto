import axios from "axios"

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: "http://123.207.32.32:8000/api/hy",
    timeout: 5000
  })
  // 2.axios拦截器
  // 2.1请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // console.log(err);
  })
  // 2.2响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);//当处理完成后，也需要返回数据，不过这里只要返回res里面的data就行了
    return res.data;
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}