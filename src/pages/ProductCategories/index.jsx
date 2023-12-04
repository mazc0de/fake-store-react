import { Link } from 'react-router-dom';
import { IoDiamond } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { FaComputer } from 'react-icons/fa6';
import { GiAmpleDress } from 'react-icons/gi';
import { BiSolidTShirt } from 'react-icons/bi';
import { Card } from '@material-tailwind/react';

import useToast from '../../hooks/useToast';
import useAxios from '../../hooks/useAxios';
import { LoadingSpinner, SectionTitle } from '../../components';

const ProductCategories = () => {
  const api = useAxios();
  const { toastError } = useToast();

  const [categories, setCategories] = useState();

  const [loading, setLoading] = useState({
    categories: true,
  });

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
      console.log(dataCategories);
      setCategories(dataCategories);
    } catch (error) {
      console.log(error);
      toastError(`Can't fetch categories`);
    } finally {
      setLoading({ categories: false });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="my-6 flex h-[70vh] flex-col items-center justify-center lg:block">
        <SectionTitle title="Categories" />
        {loading?.categories ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-2 gap-3 lg:flex lg:justify-between">
            {categories?.map((category) => {
              return (
                <Link to={`/products/categories/${category.slug}`}>
                  <Card
                    className="group flex h-28 w-28 cursor-pointer select-none flex-col items-center justify-center border  p-10 text-center font-poppins transition-all duration-200 hover:scale-105 hover:shadow-lg lg:h-40 lg:w-40 lg:p-5"
                    key={category.id}
                  >
                    <div>{category.icon}</div>
                    <p className="text-sm transition-all duration-200 group-hover:text-primary lg:text-lg">
                      {category.title}
                    </p>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCategories;
