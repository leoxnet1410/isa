import axios from 'axios';

// apiClient.js
const API_URL = 'http://localhost:3000';

export const ApiClient = {
    products: {
        getAll: async () => {
            const res = await axios.get(`${API_URL}/products`);
            return res.data.map(product => ({
                ...product,
                price: parseFloat(product.price) || 0,
                quantity: product.quantity
            }));
        },
        get: async (productId) => {
            const res = await axios.get(`${API_URL}/products/${productId}`);
            return {
                ...res.data,
                price: parseFloat(res.data.price) || 0
            };
        },
        update: async (productId, data) => {
            const updatedData = {
                ...data,
                price: parseFloat(data.price) || 0
            };
            const res = await axios.put(`${API_URL}/products/${productId}`, updatedData);
            return res.data;
        },
        add: async (data) => {
            const newData = {
                ...data,
                price: parseFloat(data.price) || 0
            };
            const res = await axios.post(`${API_URL}/products`, newData);
            return res.data;
        },
        delete: async (productId) => {
            await axios.delete(`${API_URL}/products/${productId}`);
        }
    },
    sales: {
        create: async (data) => {
            const res = await axios.post(`${API_URL}/sales`, data);
            return res.data;
        }
    }
};
