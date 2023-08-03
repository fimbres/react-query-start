import axios from 'axios'

const productsApi = axios.create({
    baseURL: 'http://localhost:3000'
});

export const getProducts = async () => {
    const res = await productsApi.get('/products');
    return res.data;
}

export interface IProduct {
    id: number,
    name: string,
    description: string,
    price: number,
    inStock: boolean,
};
