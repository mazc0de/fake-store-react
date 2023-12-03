import toast from 'react-hot-toast';

const useToast = () => {
  const toastSuccess = (message, position = 'bottom-center') => {
    toast.success(message, { position });
  };
  const toastError = (message, position = 'bottom-center') => {
    toast.error(message, { position });
  };
  return { toastSuccess, toastError };
};

export default useToast;
