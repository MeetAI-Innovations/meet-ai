import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

const getCookieToken = (tokenName: string): string | null => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${tokenName}=`));
  return token ? token.split("=")[1] : null;
};

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getCookieToken("accessToken");
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getCookieToken("refreshToken");
      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        const refreshResponse = await axiosInstance.post(
          "http://localhost:5000/api/v1/user/refresh-token",
          { refreshToken }
        );
        console.log(refreshResponse.data.data);

        document.cookie = `accessToken=${refreshResponse.data.data.accessToken}; path=/; secure; SameSite=Strict`;
        originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
