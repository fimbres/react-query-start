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

export const deleteProduct = async (id: number) => {
    productsApi.delete('/products/' + id);
}

export interface IProduct {
    id?: number,
    name: string,
    description: string,
    price: number,
    inStock: boolean,
};
