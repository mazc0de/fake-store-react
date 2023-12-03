import { Spinner } from '@material-tailwind/react';

const LoadingSpinner = () => {
  return (
    <div className="flex w-full justify-center">
      <Spinner color="red" />
    </div>
  );
};

export default LoadingSpinner;
