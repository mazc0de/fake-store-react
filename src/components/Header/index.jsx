import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Bars3Icon, ShoppingCartIcon, TrashIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
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
import { navMenu } from '../../utils/navMenu';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [openPopover, setOpenPopover] = useState(false);

  const { state, dispatch, getTotalCartItems, getTotalPriceCart } = useCart();

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

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
          <NavLink to={item.slug} key={item.id} onClick={handleDrawer}>
            {({ isActive }) => (
              <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className={`${
                  isActive
                    ? 'font-poppins font-semibold text-primary'
                    : 'p-1 font-poppins font-normal transition-all duration-200 hover:text-primary'
                }`}
              >
                {item.title}
              </Typography>
            )}
          </NavLink>
        );
      })}
    </ul>
  );
  return (
    <div className="max-h-screen w-full overflow-y-auto">
      <Navbar className="sticky top-0 z-10 flex h-max max-w-full rounded-none px-4 py-2 lg:block lg:h-20 lg:px-8 lg:py-4">
        <div className="mx-auto flex w-full items-center justify-between text-blue-gray-900 lg:max-w-screen-xl">
          <Typography as="a" href="#" className="mr-4 cursor-pointer py-1.5 font-russoOne text-2xl font-medium">
            FAKE STORE
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="hidden items-center gap-x-3 lg:flex">
              <Popover open={openPopover} handler={setOpenPopover}>
                <PopoverHandler {...triggers}>
                  <div className="relative">
                    <ShoppingCartIcon
                      className={`h-8 w-8 text-gray-500 transition-all duration-200 hover:text-primary ${
                        openPopover && 'text-primary'
                      }`}
                    />
                    <div className="absolute -bottom-[5px] -right-[10px] ">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary font-poppins text-sm text-white">
                        {getTotalCartItems()}
                      </div>
                    </div>
                  </div>
                </PopoverHandler>
                <PopoverContent {...triggers} className="z-50 flex h-auto max-h-[450px] w-96 flex-col gap-2">
                  {state.cartItems.length === 0 ? (
                    <div className="flex items-center justify-center p-5">
                      <p>Your cart is empty</p>
                    </div>
                  ) : (
                    <div className="overflow-y-scroll">
                      {state.cartItems?.map((cartItem) => {
                        return (
                          <div
                            key={cartItem.id}
                            className="mr-1 flex flex-row items-center justify-between gap-5 border-b-2 py-2 font-poppins last:border-b-0"
                          >
                            <div className="flex flex-row gap-5">
                              <img src={cartItem.image} alt={cartItem.title} className="h-auto w-16 object-cover" />
                              <div className="flex flex-col justify-between">
                                <p>{cartItem.title}</p>
                                <p>({cartItem.quantity}) pcs</p>
                              </div>
                            </div>
                            <div className="flex flex-row gap-3">
                              <p className="font-semibold">${cartItem.price}</p>
                              <TrashIcon className="w-5 text-primary" onClick={() => removeFromCart(cartItem)} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {state.cartItems.length !== 0 && (
                    <div className="flex items-center justify-between py-5 font-poppins">
                      <div className="flex flex-col gap-2">
                        <p>
                          Total Price: <span className="font-semibold">${getTotalPriceCart().toFixed(2)}</span>
                        </p>
                        <p>Total Items: {getTotalCartItems()}</p>
                      </div>
                      <div>
                        <Button size="sm" className="bg-primary">
                          Checkout
                        </Button>
                      </div>
                    </div>
                  )}
                </PopoverContent>
              </Popover>

              <UserCircleIcon className="h-8 w-8 text-gray-500 transition-all duration-200 hover:text-primary" />
            </div>
            <div className="flex">
              <div className="relative mr-3 lg:hidden">
                <ShoppingCartIcon className={`h-8 w-8 text-gray-500 transition-all duration-200`} />
                <div className="absolute -bottom-[5px] -right-[10px] ">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary font-poppins text-sm text-white">
                    {getTotalCartItems()}
                  </div>
                </div>
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
          <div className="relative">
            <Button className="ml-5 mt-3 flex gap-x-2 bg-primary" size="sm">
              <ShoppingCartIcon className="h-4 w-4 text-white transition-all duration-200 hover:text-primary" />
              Cart
            </Button>
            <div className="absolute -right-[10px] top-0 ">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black font-poppins text-sm text-white">
                {getTotalCartItems()}
              </div>
            </div>
          </div>
          <Button className="ml-5 mt-3 flex gap-x-2 bg-primary" size="sm">
            <UserCircleIcon className="h-4 w-4 text-white transition-all duration-200 hover:text-primary" />
            Profile
          </Button>
        </div>
      </Drawer>
      <div className="max-w-screen-xl lg:mx-auto">
        <div className="min-h-[calc(100vh-160px)] p-5">
          <Outlet />
        </div>
        <Footer menu={navList} />
      </div>
    </div>
  );
};

export default Header;
