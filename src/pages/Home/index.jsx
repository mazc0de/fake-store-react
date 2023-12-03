import { IoDiamond } from 'react-icons/io5';
import { FaComputer } from 'react-icons/fa6';
import { GiAmpleDress } from 'react-icons/gi';
import { BiSolidTShirt } from 'react-icons/bi';
import { useContext, useEffect, useState } from 'react';
import { Carousel, Card, CardHeader, CardBody, Typography, CardFooter, Button, Rating } from '@material-tailwind/react';

import ProductContext from '../../context/ProductContext';

import { CardProduct, LoadingSpinner, SectionTitle } from '../../components';

import Banner1 from '../../assets/images/banner/banner-1.webp';
import Banner2 from '../../assets/images/banner/banner-2.webp';

import useAxios from '../../hooks/useAxios';
import useToast from '../../hooks/useToast';

const Home = () => {
  const api = useAxios();
  const { toastError } = useToast();
  const { categories, setCategories } = useContext(ProductContext);

  const [loading, setLoading] = useState({
    categories: true,
    newArrival: true,
  });

  const [newArrivalProducts, setNewArrivalProducts] = useState();

  const fetchCategories = async () => {
    try {
      const response = await api.get(`/products/categories`);
      const data = [
        {
          id: 1,
          title: null,
          slug: null,
          icon: <FaComputer className="h-8 w-8 transition-all duration-200 group-hover:text-primary" />,
        },
        {
          id: 2,
          title: null,
          slug: null,
          icon: <IoDiamond className="h-8 w-8 transition-all duration-200 group-hover:text-primary" />,
        },
        {
          id: 3,
          title: null,
          slug: null,
          icon: <BiSolidTShirt className="h-8 w-8 transition-all duration-200 group-hover:text-primary" />,
        },
        {
          id: 4,
          title: null,
          slug: null,
          icon: <GiAmpleDress className="h-8 w-8 transition-all duration-200 group-hover:text-primary" />,
        },
      ];

      const dataCategories = data.map((item, index) => ({
        ...item,
        title: response.data[index].toUpperCase(),
        slug: response.data[index],
      }));

      setCategories(dataCategories);
    } catch (error) {
      toastError(`Can't fetch categories`);
    } finally {
      setLoading({ categories: false });
    }
  };

  const fetchNewArrivalProducts = async () => {
    try {
      const response = await api.get(`/products?limit=4`);
      setNewArrivalProducts(response?.data);
    } catch (error) {
      toastError(`Can't fetch arrival products`);
    } finally {
      setLoading({ newArrival: false });
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchNewArrivalProducts();
  }, []);
  const carouselImage = [
    {
      id: 1,
      image: Banner1,
    },
    {
      id: 2,
      image: Banner2,
    },
    {
      id: 3,
      image: Banner1,
    },
    {
      id: 4,
      image: Banner2,
    },
  ];

  return (
    <div className="mx-5">
      <Carousel className="rounded-xl" loop autoplay>
        {carouselImage?.map((image, index) => {
          return <img src={image.image} alt={image.image} className="h-72 w-full object-cover" key={index} />;
        })}
      </Carousel>

      <div className="my-6 flex flex-col items-center justify-center lg:block">
        <SectionTitle title="Categories" />
        {loading?.categories ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-2 gap-3 lg:flex lg:justify-between">
            {categories?.map((category) => {
              return (
                <Card
                  className="group flex h-28 w-28 cursor-pointer select-none flex-col items-center justify-center border  p-10 text-center font-poppins transition-all duration-200 hover:scale-105 hover:shadow-lg lg:h-40 lg:w-40 lg:p-5"
                  key={category.id}
                >
                  <div>{category.icon}</div>
                  <p className="text-sm transition-all duration-200 group-hover:text-primary lg:text-lg">
                    {category.title}
                  </p>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <div className="my-6 flex flex-col items-center justify-center lg:block">
        <SectionTitle title="New Arrivals" />
        {loading?.newArrival ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
              {newArrivalProducts?.map((product) => {
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
            <div className="my-5 flex w-full justify-center">
              <button
                className={`group relative mt-3 flex w-auto justify-center overflow-hidden rounded-md border bg-blue-gray-900/10 px-5 py-2.5 text-black transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-red-800 hover:to-primary hover:ring-2 hover:ring-primary hover:ring-offset-2`}
              >
                <span
                  className={`ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-20 transition-all duration-1000 group-hover:-translate-x-64`}
                ></span>
                <span className="relative font-poppins">View All Products</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
