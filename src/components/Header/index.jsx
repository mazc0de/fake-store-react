import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router';
import { navMenu } from '../../utils/navMenu';
import { Bars3Icon, ShoppingCartIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import {
  Navbar,
  Typography,
  Button,
  Popover,
  PopoverHandler,
  PopoverContent,
  Drawer,
  IconButton,
  List,
} from '@material-tailwind/react';
import Footer from '../Footer';

const Header = () => {
  const [openPopover, setOpenPopover] = useState(false);

  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpen(false));
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {navMenu?.map((item) => {
        return (
          <Link to={item.slug} key={item.id}>
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-normal transition-all duration-200 hover:text-primary "
            >
              {item.title}
            </Typography>
          </Link>
        );
      })}
    </ul>
  );
  return (
    <div className="max-h-screen w-full overflow-y-auto">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between text-blue-gray-900">
          <Typography as="a" href="#" className="mr-4 cursor-pointer py-1.5 font-russoOne text-2xl font-medium">
            FAKE STORE
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="hidden items-center gap-x-3 lg:flex">
              <Popover open={openPopover} handler={setOpenPopover}>
                <PopoverHandler {...triggers}>
                  <ShoppingCartIcon className="h-8 w-8 text-gray-500 transition-all duration-200 hover:text-primary" />
                </PopoverHandler>
                <PopoverContent {...triggers} className="z-50 max-w-[24rem]">
                  <div className="flex h-14 w-72 items-center justify-center">
                    <p>Your cart is empty</p>
                  </div>
                </PopoverContent>
              </Popover>

              <UserCircleIcon className="h-8 w-8 text-gray-500 transition-all duration-200 hover:text-primary" />
            </div>
            <IconButton variant="text" color="blue-gray" className="lg:hidden" onClick={handleDrawer}>
              {open ? (
                <XMarkIcon className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Bars3Icon className="h-6 w-6" strokeWidth={2} />
              )}
            </IconButton>
          </div>
        </div>
      </Navbar>
      <Drawer open={open} onClose={handleDrawer}>
        <div className="mb-2 flex items-center justify-between p-4">
          <Typography as="a" href="#" className="mr-4 cursor-pointer py-1.5 font-russoOne text-2xl font-medium">
            FAKE STORE
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={handleDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </IconButton>
        </div>
        <List>{navList}</List>
        <div className="flex">
          <Button className="ml-5 mt-3 flex gap-x-2" size="sm">
            <ShoppingCartIcon className="h-4 w-4 text-white transition-all duration-200 hover:text-primary" />
            Cart
          </Button>
          <Button className="ml-5 mt-3 flex gap-x-2" size="sm">
            <UserCircleIcon className="h-4 w-4 text-white transition-all duration-200 hover:text-primary" />
            Profile
          </Button>
        </div>
      </Drawer>
      <div className="mx-auto my-5 max-w-screen-xl">
        <Outlet />
        <Footer menu={navList} />
      </div>
    </div>
  );
};

export default Header;
