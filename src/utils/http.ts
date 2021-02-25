import axios from "axios";
import { message } from "ant-design-vue";
import router from "@/router";

const http = axios.create();

http.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem("token") || "";
    config.headers.token = token;
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function(response): any {
    return response.data;
  },
  function(error) {
    const status = error.response.status;
    if (status === 401 || status === 403) {
      // 认证错误
      router.push({ name: "Login" });
      message.error("请先登录");
      return;
    }
    return Promise.reject(error);
  }
);

export default http;
