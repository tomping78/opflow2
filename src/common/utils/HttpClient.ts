import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { message as toast } from 'antd';

/**
 * Axios common header settings
 */
axios.defaults.headers.common['Content-Type'] = 'application/json';

/**
 * Show error response message
 * @param error
 */
export function handlerResponseError(error: AxiosError) {
  const { status, message } = error.toJSON() as {
    message: string;
    status: number;
  };
  if (status === 504) toast.error({ content: message });
  if (status === 500) toast.error({ content: message });
  if (status === 400) toast.error({ content: message });
  if (status === 404) toast.error({ content: message });
  return Promise.reject(error.toJSON());
}

/**
 * Axios wrapper
 */
export const HttpClient = {
  get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return axios
      .get<T, R, D>(url, config)
      .then(response => response)
      .catch(handlerResponseError);
  },
  post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return axios
      .post<T, R, D>(url, data, config)
      .then(response => response)
      .catch(handlerResponseError);
  },
  put<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return axios
      .put<T, R, D>(url, data, config)
      .then(response => response)
      .catch(handlerResponseError);
  },
  delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return axios
      .delete<T, R, D>(url, config)
      .then(response => response)
      .catch(handlerResponseError);
  },
};
