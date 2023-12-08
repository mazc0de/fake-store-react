import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import useAxios from '../../hooks/useAxios';
import useToast from '../../hooks/useToast';
import { useCart } from '../../context/CartContext';
import { BreadcrumbsComponent, CardProduct, LoadingSpinner } from '../../components';

const ProductsCategory = () => {
  const api = useAxios();
  const { dispatch } = useCart();
  const { category } = useParams();
  const { toastError } = useToast();

  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

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

  const breadcrumbsMenu = [
    {
      title: 'Home',
      link: '/',
      active: false,
    },
    {
      title: 'Categories',
      link: '/products/categories',
      active: false,
    },
    {
      title: `${category.charAt(0).toUpperCase() + category.slice(1)}`,
      link: '/products/categories',
      active: true,
    },
  ];
  return (
    <>
      <BreadcrumbsComponent menus={breadcrumbsMenu} />
      {loading ? (
        <div className="mt-3">
          <LoadingSpinner />
        </div>
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

export default ProductsCategory;
