import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IProduct, getProducts, deleteProduct, updateProduct } from '../api/productsAPI';

const Products: React.FC = () => {
  const queryClient = useQueryClient();
  const { isError, isLoading, data, error } = useQuery<IProduct[]>({
    queryKey: ['products'],
    queryFn: getProducts,
    select: products => products.sort((a, b) => a.id! - b.id!)
  });
  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      console.log('product deleted!');
      queryClient.invalidateQueries(['products']);
    }
  });
  const { mutate: updateMutation } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      console.log('product updated!');
      queryClient.invalidateQueries(['products']);
    }
  });

  if(isLoading) {
    <div>Loading...</div>
  }

  if(isError) {
    <div>Error! {String(error) || ""}</div>
  }

  const handleDelete = (id: number) => {
    deleteMutation(id);
  };

  const handleUpdate = (product: IProduct) => {
    updateMutation(product);
  };

  return (
    <div>
      {data?.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <span>{product.price}</span>
          <input type='checkbox' defaultChecked={product.inStock} onChange={(e) => handleUpdate({ ...product, inStock: e.currentTarget.checked })} />
          <span><button onClick={() => handleDelete(product.id!)}>Delete Product</button></span>
          <br />
          <br />
        </div>
      ))}
    </div>
  )
}

export default Products;
