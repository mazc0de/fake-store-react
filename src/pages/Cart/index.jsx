import React, { useEffect, useState } from 'react';
import { BreadcrumbsComponent, SectionTitle } from '../../components';
import { useCart } from '../../context/CartContext';
import { MinusIcon, PlusIcon, TagIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button, IconButton, Input } from '@material-tailwind/react';

const Cart = () => {
  const { state, dispatch, getTotalPriceCart } = useCart();

  const { totalPrice, discountPrice, priceAfterDiscount } = getTotalPriceCart();

  const [promoCode, setPromoCode] = useState();
  const [promoDiscount, setPromoDiscount] = useState();

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  const addQuantity = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const handleApplyPromoCode = async () => {
    let promoDiscount = 0;
    if (promoCode === 'HARBOLNAS') {
      promoDiscount = 0.2;
    } else if (promoCode === '1212') {
      promoDiscount = 0.22;
    } else {
      setPromoDiscount(0);
    }
    console.log();
    await dispatch({ type: 'APPLY_PROMO', payload: { promoCode, promoDiscount } });
  };

  const handleReduceQuantity = (itemId, item) => {
    const product = state.cartItems.find((item) => item.id === itemId);
    if (product && product.quantity > 1) {
      dispatch({ type: 'REDUCE_QUANTITY', payload: { id: item.id } });
    } else {
      dispatch({ type: 'REMOVE_FROM_CART', payload: item });
    }
  };

  const handleChangePromoCode = (e) => {
    setPromoCode(e.target.value);
  };

  const breadcrumbsMenu = [
    {
      title: 'Home',
      link: '/',
      active: false,
    },
    {
      title: 'Cart',
      link: '/cart',
      active: true,
    },
  ];

  return (
    <>
      <BreadcrumbsComponent menus={breadcrumbsMenu} />
      <SectionTitle title="Your Cart" />
      <div className="grid grid-cols-1 gap-2 font-poppins lg:grid-cols-3">
        <div
          className={`flex flex-col gap-3 rounded-lg border p-5 lg:col-span-2 ${
            state.cartItems?.length === 0 && 'lg:col-span-3'
          }`}
        >
          <div>
            {state.cartItems?.length === 0 ? (
              <div className="flex items-center justify-center p-5">
                <p>Your cart is empty</p>
              </div>
            ) : (
              <>
                {state.cartItems?.map((item) => {
                  return (
                    <div className="flex flex-col border-b-2 font-poppins last:border-none" key={item.id}>
                      <div className="my-3 flex flex-row gap-2 lg:gap-5">
                        <div className="w-1/5 lg:w-20">
                          <img src={item.image} alt={item.title} />
                        </div>
                        <div className="flex w-3/5 flex-col justify-between gap-2">
                          <p className="text-sm font-bold lg:text-lg">{item.title}</p>
                          <p className="text-sm font-semibold lg:text-2xl">${item.price}</p>
                        </div>
                        <div className="flex w-2/5 flex-col items-end justify-between">
                          <TrashIcon className="w-5 cursor-pointer text-primary" onClick={() => removeFromCart(item)} />
                          <div className="flex items-center gap-3">
                            <IconButton
                              size="sm"
                              className="bg-primary"
                              onClick={() => handleReduceQuantity(item.id, item)}
                            >
                              <MinusIcon className="w-5" />
                            </IconButton>
                            {item.quantity}
                            <IconButton size="sm" className="bg-primary">
                              <PlusIcon className="w-5" onClick={() => addQuantity(item)} />
                            </IconButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
        {state.cartItems?.length !== 0 && (
          <div className="flex h-96 flex-col gap-3 rounded-lg border p-5">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p className="font-semibold">${totalPrice.toFixed(2)}</p>
            </div>
            {state.promoCode && (
              <>
                <div className="flex justify-between">
                  <p>Discount</p>
                  <p className="font-semibold">${discountPrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-lg font-semibold">Total</p>
                  <p className="text-lg font-semibold">${priceAfterDiscount.toFixed(2)}</p>
                </div>
              </>
            )}
            <div className="border-b-2"></div>
            <div className="flex flex-col gap-2">
              <Input
                onChange={handleChangePromoCode}
                icon={<TagIcon className="w-5" />}
                type="text"
                placeholder="Add Promo Code"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                labelProps={{
                  className: 'hidden',
                }}
                containerProps={{ className: 'min-w-[100px]' }}
              />
              <Button className="self-end bg-primary" onClick={handleApplyPromoCode}>
                Apply
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
