import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, Input, Spinner } from '@material-tailwind/react';

import { useContext } from 'react';
import { Navigate } from 'react-router';

import AuthContext from '../../context/AuthContext';
import SideImage from '../../assets/images/side-image.png';

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const Login = () => {
  const { loginUser, loadingButton, error } = useContext(AuthContext);

  const auth = localStorage.getItem('auth');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  if (auth) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="mx-10 my-16 flex flex-col gap-3 font-poppins lg:mx-0 lg:my-0 lg:flex-row">
      <div className="hidden lg:block lg:w-1/2">
        <img src={SideImage} alt="side-image" />
      </div>
      <div className="lg:flex lg:w-1/2 lg:flex-col lg:justify-center lg:gap-2 lg:px-8">
        <div className="flex flex-col gap-2">
          <p className="font-poppins text-xl font-semibold">Log In to Fake Store</p>
          <p className="font-poppins text-sm">Enter your details below</p>
          <Alert color="amber">
            <p>
              Username : <span className="font-semibold">mor_2314</span>
            </p>
            <p>
              Password : <span className="font-semibold">83r5^_</span>
            </p>
          </Alert>
          {error?.login && <p className="text-red-400">{error?.message}</p>}
        </div>
        <form onSubmit={handleSubmit(loginUser)}>
          <div className="mt-2 flex flex-col gap-5">
            <Input variant="standard" label="Username" {...register('username')} />
            {errors?.username && <p className="text-red-400">{errors?.username?.message}</p>}
            <Input variant="standard" label="Password" {...register('password')} />
            {errors?.password && <p className="text-red-400">{errors?.password?.message}</p>}
            <div className="flex w-full items-center justify-between">
              <Button className="bg-primary px-12 lg:px-24" type="submit">
                {loadingButton.login ? <Spinner className="h-5 w-5" /> : 'Log in'}
              </Button>
              <p className="text-primary hover:cursor-pointer hover:underline">Forget Password?</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
