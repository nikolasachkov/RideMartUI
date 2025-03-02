import axios from "axios";

const API_URL = "/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const login = async (username, password) => {
    const response = await api.post("/auth/login", { username, password });
    return response.data;
};

export const register = async (username, email, password, phoneNumber) => {
    const response = await api.post("/auth/register", { username, email, password, phoneNumber });
    return response.data;
};

export const getUserProfile = async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
};

export const updateUserProfile = async (userData) => {
    const token = localStorage.getItem("token");
    const response = await api.put("/profile", userData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const logout = () => {
    localStorage.removeItem("token");
};

export const getMotorcycleMakesAndModels = async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/motorcycles/all", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const createAdvertisement = async (advertisementData) => {
    const token = localStorage.getItem("token");
    const response = await api.post("/advertisements", advertisementData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
};

export default api;
