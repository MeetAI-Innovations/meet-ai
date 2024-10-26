import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    withCredentials: true,
});

const getCookieToken = (tokenName: string): string | null => {
    const token = document.cookie.split('; ').find(row => row.startsWith(`${tokenName}=`));
    console.log(document.cookie.split('; '));
    

    return token ? token.split('=')[1] : null;
};

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const accessToken = getCookieToken('accessToken');
        console.log("accessToken: ",accessToken);
        
        if (accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        console.log(config.headers.Authorization);
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
            const refreshToken = getCookieToken('refreshToken');
            console.log("refresh ",refreshToken);
            
            try {
                const refreshResponse = await axiosInstance.post('/user/refresh-token', { refreshToken });
                document.cookie = `accessToken=${refreshResponse.data.accessToken}; path=/; secure; SameSite=Strict`;
                originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.data.accessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Error refreshing token', refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
