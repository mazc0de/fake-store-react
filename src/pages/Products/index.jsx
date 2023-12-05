import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BreadcrumbsComponent, CardProduct, LoadingSpinner } from '../../components';

import useAxios from '../../hooks/useAxios';
import useToast from '../../hooks/useToast';
import { useCart } from '../../context/CartContext';

const Products = () => {
  const api = useAxios();
  const { dispatch } = useCart();
  const { toastError } = useToast();

  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

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

  const breadcrumbsMenu = [
    {
      title: 'Home',
      link: '/',
      active: false,
    },
    {
      title: 'Products',
      link: '/products',
      active: true,
    },
  ];

  return (
    <>
      <BreadcrumbsComponent menus={breadcrumbsMenu} />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mt-3 grid grid-cols-1 gap-5 lg:grid-cols-4">
          {products?.map((product) => {
            return (
              <Link to={`/products/${product.id}`} key={product.id}>
                <CardProduct
                  handleAddToCart={() => addToCart(product)}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  rate={product.rating.rate}
                  count={product.rating.count}
                />
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Products;
