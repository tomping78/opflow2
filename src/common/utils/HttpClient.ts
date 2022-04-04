import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { message as toast } from 'antd';
import { RecoilSet } from '../../SpinStatePortal';
import { spinState } from '../../store/spin';

function showLoading() {
  RecoilSet<number>(spinState, spinState => spinState + 1);
}

function hideLoading() {
  RecoilSet<number>(spinState, spinState => {
    if (spinState === 0) return spinState;
    return spinState - 1;
  });
}

/**
 * Axios common header settings
 */
axios.defaults.headers.common['Content-Type'] = 'application/json';

/**
 * Request interceptor
 */
axios.interceptors.request.use(response => {
  showLoading();
  return response;
});

/**
 * Response interceptor
 */
axios.interceptors.response.use(response => {
  hideLoading();
  return response;
});

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
      .catch(handlerResponseError)
      .finally(hideLoading);
  },
  post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return axios
      .post<T, R, D>(url, data, config)
      .then(response => response)
      .catch(handlerResponseError)
      .finally(hideLoading);
  },
  put<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return axios
      .put<T, R, D>(url, data, config)
      .then(response => response)
      .catch(handlerResponseError)
      .finally(hideLoading);
  },
  delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return axios
      .delete<T, R, D>(url, config)
      .then(response => response)
      .catch(handlerResponseError)
      .finally(hideLoading);
  },
};
