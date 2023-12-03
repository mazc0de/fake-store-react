import { IoDiamond } from 'react-icons/io5';
import { FaComputer } from 'react-icons/fa6';
import { GiAmpleDress } from 'react-icons/gi';
import { BiSolidTShirt } from 'react-icons/bi';
import { Carousel, Card } from '@material-tailwind/react';
import { useContext, useEffect, useState } from 'react';

import useAxios from '../../hooks/useAxios';
import ProductContext from '../../context/ProductContext';

import { LoadingSpinner, SectionTitle } from '../../components';

import Banner1 from '../../assets/images/banner/banner-1.webp';
import Banner2 from '../../assets/images/banner/banner-2.webp';

const Home = () => {
  const api = useAxios();
  const { categories, setCategories } = useContext(ProductContext);

  const [loading, setLoading] = useState({ categories: true });

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
      console.log(error);
    } finally {
      setLoading({ ...loading, categories: false });
    }
  };

  console.log(categories);
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="mx-5">
      <Carousel className="rounded-xl" loop autoplay>
        <img src={Banner1} alt="image 1" className="h-72 w-full object-cover" />
        <img src={Banner2} alt="image 2" className="h-72 w-full object-cover" />
        <img src={Banner1} alt="image 1" className="h-72 w-full object-cover" />
        <img src={Banner2} alt="image 2" className="h-72 w-full object-cover" />
      </Carousel>

      <div className="my-6 flex flex-col items-center justify-center lg:block">
        <SectionTitle title="Categories" />
        {loading.categories ? (
          <LoadingSpinner size="700" />
        ) : (
          <div className="grid grid-cols-2 gap-3 lg:flex lg:justify-between">
            {categories?.map((category) => {
              return (
                <Card className="group flex h-28 w-28 cursor-pointer select-none flex-col items-center justify-center border p-10 text-center font-poppins transition-all duration-200 hover:shadow-lg lg:h-40 lg:w-40 lg:p-5">
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
        {/* <div className="grid grid-cols-2 gap-3 lg:flex lg:justify-between">
          {categories?.map((category) => {
            return (
              <Card className="group flex h-28 w-28 cursor-pointer select-none flex-col items-center justify-center border p-10 text-center font-poppins transition-all duration-200 hover:shadow-lg lg:h-40 lg:w-40 lg:p-5">
                <div>{category.icon}</div>
                <p className="transition-all duration-200 group-hover:text-primary">{category.title}</p>
              </Card>
            );
          })}
        </div> */}
      </div>
    </div>
  );
};

export default Home;
