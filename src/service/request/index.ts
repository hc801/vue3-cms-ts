import axios from "axios";
import type { AxiosInstance } from "axios";

import type { HYRequestInterceptors, HYRequestConfig } from "./type";

import { ElLoading } from "element-plus";

const isLoading = true;

class HYRequest {
  instance: AxiosInstance;
  interceptors?: HYRequestInterceptors;
  loading?: any;
  showLoading?: boolean;

  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? isLoading;

    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 2.所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log("所有实例都有的拦截器：请求拦截成功");

        if (this.showLoading) {
          // 添加loading动画
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求数据...",
            background: "rgba(0, 0, 0, .5)"
          });
        }

        return config;
      },
      (err) => {
        // console.log("所有实例都有的拦截器：请求拦截失败");
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        // console.log("所有实例都有的拦截器：响应拦截成功");

        // 取消loading动画
        this.loading?.close();

        const data = res.data;
        if (data.returnCode === "-1001") {
          console.log("请求失败~，错误信息");
        } else {
          return data;
        }
      },
      (err) => {
        // console.log("所有实例都有的拦截器：响应拦截失败");
        // 例子：判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log("404的错误~");
        }
        return err;
      }
    );
  }

  request<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      if (config.showLoading !== null && config.showLoading !== undefined) {
        this.showLoading = config.showLoading;
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }

          this.showLoading = isLoading;
          resolve(res);
        })
        .catch((err) => {
          this.showLoading = isLoading;
          reject(err);
        });
    });
  }

  get<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }

  post<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }

  delete<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }

  patch<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}

export default HYRequest;
