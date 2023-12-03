import { useEffect, useState } from 'react';
import { CardProduct, LoadingSpinner, SectionTitle } from '../../components';

import useAxios from '../../hooks/useAxios';
import useToast from '../../hooks/useToast';

const Products = () => {
  const api = useAxios();
  const { toastError } = useToast();

  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await api.get(`/products`);
      setProducts(response?.data);
    } catch (error) {
      toastError(`Can't fetch products`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <SectionTitle title="All Products" />
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

export default Products;
