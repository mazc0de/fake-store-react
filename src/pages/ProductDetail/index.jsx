import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Chip, Rating } from '@material-tailwind/react';

import useAxios from '../../hooks/useAxios';
import useToast from '../../hooks/useToast';

import { useCart } from '../../context/CartContext';
import { BreadcrumbsComponent, LoadingSpinner } from '../../components';

const ProductDetail = () => {
  const api = useAxios();
  const { id } = useParams();
  const { dispatch } = useCart();
  const { toastError } = useToast();

  const [loading, setLoading] = useState(true);
  const [productDetail, setProductDetail] = useState();

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const fetchProductDetail = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProductDetail(response?.data);
    } catch (error) {
      toastError(`Can't fetch product detail!`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetail();
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
      active: false,
    },
    {
      title: `${productDetail?.title ? productDetail?.title : ''}`,
      link: '/#',
      active: true,
    },
  ];

  return (
    <>
      <BreadcrumbsComponent menus={breadcrumbsMenu} />

      {loading ? (
        <>
          <LoadingSpinner />
        </>
      ) : (
        <>
          <div className=" mt-3 grid grid-cols-1 gap-2 font-poppins lg:grid-cols-2">
            <div className="flex justify-center">
              <div className="w-80 rounded-lg border p-5">
                <img src={productDetail?.image} alt={productDetail?.title} />
              </div>
            </div>
            <div className="flex flex-col justify-center gap-5">
              <div className="self-start">
                <Chip variant="outlined" value={productDetail?.category} className="rounded-full" />
              </div>
              <p className="text-2xl font-semibold">{productDetail?.title}</p>
              <div className="flex items-center gap-2">
                <Rating value={Math.floor(productDetail?.rating?.rate)} readonly />
                <p>{productDetail?.rating?.rate}</p>
                <p>({productDetail?.rating?.count})</p>
              </div>
              <p className="text-xl font-semibold">${productDetail?.price}</p>
              <p className="">{productDetail?.description}</p>
              <div className="self-end">
                <Button
                  onClick={() => addToCart(productDetail)}
                  ripple={false}
                  fullWidth={true}
                  className="bg-blue-gray-900/10 font-poppins text-blue-gray-900 shadow-none hover:scale-105 hover:bg-red-200 hover:text-red-800 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
          {/* <div className="flex max-h-full flex-col gap-2 font-poppins lg:flex-row">
            <div className="grid grid-cols-1 place-items-center rounded-lg p-5 lg:w-1/2">
              <div className="flex w-full justify-center">
                <img
                  src={productDetail?.image}
                  alt={productDetail?.name}
                  className="w-36 rounded-lg md:w-40 lg:w-full"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 lg:w-1/2">
              <p className="text-xl font-semibold">{productDetail?.title}</p>
              <div className="flex items-center gap-2">
                <Rating value={Math.floor(productDetail?.rating?.rate)} readonly />
                <p>({productDetail?.rating?.count})</p>
              </div>
              <p className="text-lg font-semibold">${productDetail?.price}</p>
              <p>{productDetail?.description}</p>
              <Button
                onClick={() => addToCart(productDetail)}
                ripple={false}
                fullWidth={true}
                className="bg-blue-gray-900/10 font-poppins text-blue-gray-900 shadow-none hover:scale-105 hover:bg-red-200 hover:text-red-800 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              >
                Add to Cart
              </Button>
            </div>
          </div> */}
        </>
      )}
    </>
  );
};

export default ProductDetail;