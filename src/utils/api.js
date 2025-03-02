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
    const response = await api.put("/users/me", userData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const logout = () => {
    localStorage.removeItem("token");
};

export const getMotorcycleMakesAndModels = async () => {
    const response = await api.get("/motorcycles/all");
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

export const getFilteredAdvertisements = async (filterParams) => {
    try {
        const response = await axios.get(`${API_URL}/advertisements/filter`, { params: filterParams });
        return response.data;
    } catch (error) {
        console.error("Error fetching filtered advertisements:", error);
        throw error;
    }
};

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export const getSavedAdvertisements = async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/saved-ads", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const saveAdvertisement = async (advertisementId) => {
    const token = localStorage.getItem("token");
    const response = await api.post(
        `/saved-ads/${advertisementId}`,
        {},
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
};

export const unsaveAdvertisement = async (advertisementId) => {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/saved-ads/${advertisementId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getAuthenticatedUser = async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getUserAdvertisements = async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/advertisements/my-ads", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export default api;
