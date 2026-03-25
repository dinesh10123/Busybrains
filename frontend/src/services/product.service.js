import api from './api';

const getAllProducts = () => api.get('/products');
const getProductById = (id) => api.get(`/products/${id}`);
const createProduct = (product) => api.post('/products', product);
const updateProduct = (id, product) => api.put(`/products/${id}`, product);
const deleteProduct = (id) => api.delete(`/products/${id}`);

const productService = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};

export default productService;
