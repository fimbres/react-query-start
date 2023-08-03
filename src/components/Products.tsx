import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { IProduct, getProducts } from '../api/productsAPI';

const Products: React.FC = () => {
  const { isError, isLoading, data, error } = useQuery<IProduct[]>({
    queryKey: ['products'],
    queryFn: getProducts,
    select: products => products.sort((a, b) => a.id! - b.id!)
  });

  if(isLoading) {
    <div>Loading...</div>
  }

  if(isError) {
    <div>Error! {String(error) || ""}</div>
  }

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
