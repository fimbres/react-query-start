import axios from 'axios'

const productsApi = axios.create({
    baseURL: 'http://localhost:3000'
});

export const getProducts = async () => {
    const res = await productsApi.get('/products');
    return res.data;
}

export const createProduct = async (product: IProduct) => {
    productsApi.post('/products', product);
}

export interface IProduct {
    id?: number,
    name: string,
    description: string,
    price: number,
    inStock: boolean,
};
