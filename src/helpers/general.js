import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastConfig = {
  position: 'top-right',
  autoClose: 5000, 
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const helper = {
  showToast: (message, type = 'info') => {
    switch (type) {
      case 'success':
        toast.success(message, toastConfig);
        break;
      case 'error':
        toast.error(message, toastConfig);
        break;
      case 'warning':
        toast.warning(message, toastConfig);
        break;
      default:
        toast.info(message, toastConfig);
        break;
    }
  },

  handleErrors: (error, showToast = false) => {
    if (error.response) {
      const { status, data } = error.response;
  
      switch (status) {
        case 401:
          window.location.href = '/';
          if (showToast) helper.showToast(data.message, 'error');
          break;
        case 404:
          window.location.href = '/';  
          if (showToast) helper.showToast(data.message, 'error');
          break;
        case 419:
          if (showToast) helper.showToast(data.message, 'error');
          return [data.message];
        case 422:
          const validationErrors = Object.values(data.errors);
          const errorMessages = validationErrors.flatMap((errors) =>
            errors.map((error) => error)
          );
          if (showToast)
            errorMessages.forEach((errorMessage) =>
              helper.showToast(errorMessage, 'error')
            );
          return errorMessages;
        default:
          const errorMessage = 'An unexpected error occurred. Please try again later';
          if (showToast) helper.showToast(errorMessage, 'error');
          return [errorMessage];
      }
    }
  },
    
};