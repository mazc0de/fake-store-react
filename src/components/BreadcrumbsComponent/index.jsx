import { Breadcrumbs } from '@material-tailwind/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const BreadcrumbsComponent = ({ menus }) => {
  return (
    <Breadcrumbs separator={<ChevronRightIcon className="w-5" />} className="">
      {menus?.map((menu, index) => {
        return (
          <Link to={menu.link} className={`${menu.active ? 'opacity-60' : ''} font-poppins`} key={index}>
            <span>{menu.title}</span>
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;
