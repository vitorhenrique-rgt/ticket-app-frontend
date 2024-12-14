import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiOutlineClock, HiX } from "react-icons/hi";

const CustomToast = ({ type, message, onDismiss }) => {
  const toastConfig = {
    success: {
      icon: <HiCheck className="h-5 w-5" />,
      bgColor:
        "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200",
    },
    error: {
      icon: <HiX className="h-5 w-5" />,
      bgColor: "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200",
    },
    warning: {
      icon: <HiExclamation className="h-5 w-5" />,
      bgColor:
        "bg-yellow-100 text-yellow-500 dark:bg-yellow-800 dark:text-yellow-200",
    },
    loading: {
      icon: <HiOutlineClock className="h-5 w-5" />,
      bgColor: "bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200",
    },
  };

  const config = toastConfig[type];

  return (
    <div className="fixed right-5 top-24 z-50">
      <Toast>
        <div
          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${config.bgColor}`}
        >
          {config.icon}
        </div>
        <div className="ml-3 text-sm font-normal">{message}</div>
        <Toast.Toggle onDismiss={onDismiss} />
      </Toast>
    </div>
  );
};

export default CustomToast;

// showToast('success', 'Operação realizada com sucesso!');
// showToast('error', 'Ocorreu um erro!');
// showToast('warning', 'Atenção!');
// showToast('loading', 'Processando...');
