import axios from 'axios';

// apiClient.js
const API_URL = 'http://localhost:3000';

export const ApiClient = {
    products: {
        getAll: async () => {
          const res = await axios.get(`${API_URL}/products`);
          return res.data.map(product => ({
            ...product,
            price: parseFloat(product.price) || 0, // Asegurarse que sea un número
          }));
        },
        get: async (productId) => {
          const res = await axios.get(`${API_URL}/products/${productId}`);
          return {
            ...res.data,
            price: parseFloat(res.data.price) || 0, // Asegurarse que sea un número
          };
        },
        update: async (productId, data) => {
          const updatedData = {
            ...data.product,
            price: parseFloat(data.product.price) || 0 // Asegurarse que sea un número
          };
          const res = await axios.put(`${API_URL}/products/${productId}`, { product: updatedData });
          return res.data;
        },
        add: async (data) => {
          const newData = {
            ...data.product,
            price: parseFloat(data.product.price) || 0 // Asegurarse que sea un número
          };
          const res = await axios.post(`${API_URL}/products`, { product: newData });
          return res.data;
        
      },
      delete: async (productId) => {
        try {
            await axios.delete(`${API_URL}/products/${productId}`);
        } catch (error) {
            // Manejar el error de manera adecuada
            console.error('Error deleting product:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
    },
    sales: {
        create: async (data) => {
            const res = await axios.post(`${API_URL}/sales`, data);
            return res.data;
        }
    }
};
