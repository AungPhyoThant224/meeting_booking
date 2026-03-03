import axios, { type AxiosInstance } from "axios";
import Cookies from "js-cookie";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("token");
      Cookies.remove("user");
    }
    return Promise.reject(error);
  },
);

class APIClient<TResponse, TRequest = TResponse> {
  endPoint: string;

  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }

  getAll = (params?: any) =>
    axiosInstance
      .get<TResponse>(this.endPoint, { params })
      .then((res) => res.data);

  get = (id: number | string) =>
    axiosInstance
      .get<TResponse>(`${this.endPoint}/${id}`)
      .then((res) => res.data);

  post = (data: TRequest) =>
    axiosInstance.post<TResponse>(this.endPoint, data).then((res) => res.data);

  put = (udata: { data: TRequest; id?: number | string }) =>
    axiosInstance
      .put<TResponse>(
        udata.id ? `${this.endPoint}/${udata.id}` : this.endPoint,
        udata.data,
      )
      .then((res) => res.data);

  patch = (udata: { data: Partial<TRequest>; id?: number | string }) =>
    axiosInstance
      .patch<TResponse>(
        udata.id ? `${this.endPoint}/${udata.id}` : this.endPoint,
        udata.data,
      )
      .then((res) => res.data);

  delete = (id: number | string) =>
    axiosInstance
      .delete<TResponse>(`${this.endPoint}/${id}`)
      .then((res) => res.data);
}

export default APIClient;
