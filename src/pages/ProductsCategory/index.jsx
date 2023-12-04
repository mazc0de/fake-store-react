import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useParams } from 'react-router-dom';
import { CardProduct, LoadingSpinner, SectionTitle } from '../../components';
import useToast from '../../hooks/useToast';

const ProductsCategory = () => {
  const api = useAxios();
  const { category } = useParams();
  const { toastError } = useToast();

  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  const fetchProductByCategory = async () => {
    try {
      const response = await api.get(`/products/category/${category}`);
      setProducts(response?.data);
    } catch (error) {
      toastError(`Can't fetch ${category} products`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductByCategory();
  }, []);
  return (
    <>
      <SectionTitle title={category.charAt(0).toUpperCase() + category.slice(1)} />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
          {products?.map((product) => {
            return (
              <CardProduct
                key={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
                rate={product.rating.rate}
                count={product.rating.count}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default ProductsCategory;
