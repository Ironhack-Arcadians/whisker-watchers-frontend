import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5005",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if(token && !config.url.includes("/auth/login")) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
(error) => {
    return Promise.reject(error);
}
);

export default axiosInstance;