import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import { Button, Input, Radio, Spinner } from '@material-tailwind/react';

import { useCart } from '../../context/CartContext';
import { BreadcrumbsComponent, SectionTitle } from '../../components';

const phoneRegex = /^0\d{9,11}$/;

const schema = yup.object().shape({
  name: yup.string().required('Name is required!'),
  city: yup.string().required('City is required!'),
  address: yup.string().required('Address is required!'),
  payment_method: yup.string().required('Payment method is required!'),
  email: yup.string().email('Invalid email address').required('Email is required!'),
  phone_number: yup.string().matches(phoneRegex, 'Invalid phone number').required('Phone number is required!'),
});
const Checkout = () => {
  const { state, dispatch } = useCart();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [paymentMethod, setPaymentMethod] = useState();
  const [loadingButton, setLoadingButton] = useState(false);
  const [isOrderSuccess, setOrderSuccess] = useState(false);

  const onSubmit = (data) => {
    setOrderSuccess(true);
    setLoadingButton(true);
    setLoadingButton(false);
    dispatch({ type: 'RESET_CART' });
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
    {
      title: 'Checkout',
      link: '/checkout',
      active: true,
    },
  ];
  return (
    <>
      <BreadcrumbsComponent menus={breadcrumbsMenu} />
      <SectionTitle title="Checkout" />
      {state.cartItems.length > 0 && !isOrderSuccess ? (
        <div className="rounded-lg border p-5 font-poppins">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <h3 className="text-lg">Billing Detail</h3>
            <div className="form-group flex w-full flex-col gap-5 lg:flex-row">
              <div className="w-full">
                <Input label="Name" {...register('name')} />
                {errors?.name && <p className="text-primary">{errors?.name?.message}</p>}
              </div>
              <div className="w-full">
                <Input label="Email" {...register('email')} />
                {errors?.email && <p className="text-primary">{errors?.email?.message}</p>}
              </div>
            </div>
            <div className="form-group flex w-full flex-col gap-5 lg:flex-row">
              <div className="w-full">
                <Input label="City" {...register('city')} />
                {errors?.city && <p className="text-primary">{errors?.city?.message}</p>}
              </div>
              <div className="w-full">
                <Input label="Phone Number" {...register('phone_number')} />
                {errors?.phone_number && <p className="text-primary">{errors?.phone_number?.message}</p>}
              </div>
            </div>
            <div className="form-group flex flex-col gap-5 lg:flex-row">
              <div className="w-full">
                <Input label="Address" {...register('address')} />
                {errors?.address && <p className="text-primary">{errors?.address?.message}</p>}
              </div>
            </div>
            <h3 className="text-lg">Payment Method</h3>
            <div className="form-group flex w-full flex-col lg:flex-row">
              <Radio
                name="payment_method"
                label="Bank Transfer"
                value={'bank'}
                {...register('payment_method')}
                onClick={() => setPaymentMethod('bank')}
              />
              <Radio
                name="payment_method"
                label="COD"
                value={'cod'}
                {...register('payment_method')}
                onClick={() => setPaymentMethod('cod')}
              />
            </div>
            <div className="form-group flex w-full flex-col lg:flex-row">
              {paymentMethod === 'bank' && (
                <div className="rounded-lg bg-blue-400 p-5">
                  BCA : <span className="font-semibold">1234561234</span> (PT FAKE STORE INDONESIA)
                </div>
              )}
            </div>
            {errors?.payment_method && <p className="text-primary">{errors?.payment_method?.message}</p>}

            <div className="form-group w-full">
              <Button type="submit" className="bg-primary">
                {loadingButton ? <Spinner className="w-5" /> : 'Place Order'}
              </Button>
            </div>
          </form>
        </div>
      ) : state.cartItems.length === 0 && isOrderSuccess ? (
        <div className="flex items-center justify-center gap-2">
          <CheckBadgeIcon className="w-10 text-green-500" />
          <p className="font-poppins text-2xl text-green-500">Your order was placed</p>
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-lg border p-10">
          <p className="font-poppins">Your cart is empty</p>
        </div>
      )}
    </>
  );
};

export default Checkout;
