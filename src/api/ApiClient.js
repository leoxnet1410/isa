import axios from 'axios';

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
    update: async (productId, formData) => {
      const res = await axios.put(`${API_URL}/products/${productId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data;
    },
    add: async (formData) => {
      const res = await axios.post(`${API_URL}/products`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data;
    },
    delete: async (productId) => {
      try {
        const response = await axios.delete(`${API_URL}/products/${productId}`);
        return response.data;
      } catch (error) {
        console.error('Error deleting product:', error.response ? error.response.data : error.message);
        throw error;
      }
    },
  },
  sales: {
    getAll: async () => {
      const res = await axios.get(`${API_URL}/sales`);
      return res.data;
    },
    create: async (data) => {
      const res = await axios.post(`${API_URL}/sales`, { sale: data });
      return res.data;
    }
  },
  customers: {
    getAll: async () => {
      const res = await axios.get(`${API_URL}/customers`);
      return res.data;
    },
    add: async (customerData) => {
      // Los datos se envían como un objeto anidado bajo "customer"
      const res = await axios.post(`${API_URL}/customers`, { customer: customerData });
      return res.data;
    },
    update: async (id, customerData) => {
      // Los datos se envían como un objeto anidado bajo "customer"
      const res = await axios.put(`${API_URL}/customers/${id}`, { customer: customerData });
      return res.data;
    },
    delete: async (id) => {
      await axios.delete(`${API_URL}/customers/${id}`);
    }
  }
};
