import axios from 'axios'
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import store from '@/store'
import { Toast } from 'vant'
import { ResultEnum } from '@/enums/httpEnum'

interface AxiosConfig {
  timeout: number;
  baseURL?: string;
}
export interface Result<T = any> {
  code: number;
  message: string;
  result: T;
}
class Server {
  private instance: AxiosInstance
  private config: AxiosConfig
  constructor (config: AxiosConfig) {
    this.config = config
    this.instance = axios.create(config)
    this.setupInterceptors()
  }

  getAxios(): AxiosInstance {
    return this.instance
  }

  private setupInterceptors() {
    this.instance.interceptors.response.use((response: AxiosResponse<any>): any => {
      const res = response.data
      if (res.code === ResultEnum.ERROR && res.message === ResultEnum.ERRMESSAGE) {
        Toast('请登录')
        store.commit('muLoginOut')
        location.reload()
        return Promise.resolve(res)
      }
      if (res.code === ResultEnum.SUCCESS) {
        return Promise.resolve(res)
      } else {
        if (res.resultMsg) {
          Toast(res.resultMsg)
        }
        return Promise.resolve(res)
      }
    })
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, AxiosResponse<Result>>(config)
        .then((res: AxiosResponse<Result>) => {
          resolve((res as unknown) as Promise<T>);
        })
        .catch((e: Error) => {
          reject(e);
        });
    });
  }
}


const service = new Server({ timeout: 5000 } as AxiosConfig)
export default service