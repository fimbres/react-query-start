import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IProduct, createProduct } from '../api/productsAPI';

const ProductForm = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
        console.log('Product saved!');
        queryClient.invalidateQueries(['products']);
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const product = Object.fromEntries(formData) as unknown;

    mutate(product as IProduct);
  }

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='name'/>
        <label htmlFor='description'>Description</label>
        <input type='text' id='description' name='description'/>
        <label htmlFor='price'>Price</label>
        <input type='number' id='price' name='price'/>
        <label htmlFor='inStock'>In Stock</label>
        <input id='inStock' name='inStock' type='checkbox' />
        <input type='submit' value='Save Product' />
    </form>
  )
}

export default ProductForm
