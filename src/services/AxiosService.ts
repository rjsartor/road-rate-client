import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL } from '../config';

class AxiosService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${API_BASE_URL}/`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use(
      config => {
        config.headers.Authorization = this.getAuthToken();
        return config;
      },
      error => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response, 
      (error: AxiosError) => {
        console.error("API Error:", error);
        throw error;
      }
    );
  }

  private getAuthToken(): string | null {
    try {
        return localStorage.getItem('authToken');
    } catch (error) {
        console.error("Error accessing localStorage:", error);
        return null;
    }
  }

  public async get<T>(url: string, params?: any): Promise<AxiosResponse<T>> {
    console.log('params', params)
    return this.axiosInstance.get<T>(url, { params });
  }

  public async post<T>(
    url: string,
    data: any,
    config?: any
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  public async put<T>(
    url: string,
    data: any,
    config?: any
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }
}

export default new AxiosService();
