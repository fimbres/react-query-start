import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IProduct, getProducts, deleteProduct } from '../api/productsAPI';

const Products: React.FC = () => {
  const queryClient = useQueryClient();
  const { isError, isLoading, data, error } = useQuery<IProduct[]>({
    queryKey: ['products'],
    queryFn: getProducts,
    select: products => products.sort((a, b) => a.id! - b.id!)
  });
  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      console.log('product deleted!');
      queryClient.invalidateQueries(['products']);
    }
  });

  if(isLoading) {
    <div>Loading...</div>
  }

  if(isError) {
    <div>Error! {String(error) || ""}</div>
  }

  const handleDelete = async (id: number) => {
    mutate(id);
  };

  return (
    <div>
      {data?.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <span>{product.price}</span>
          <input type='checkbox' defaultChecked={product.inStock} disabled={true} />
          <br />
          <br />
        </div>
      ))}
    </div>
  )
}

export default Products;
