import { createContext, useContext, useRef } from "react";
import { Toast } from "primereact/toast";

// Create a Toast Context
const ToastContext = createContext();

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const toastRef = useRef(null);

  const showToast = (severity, summary, detail) => {
    toastRef.current.show({ severity, summary, detail, life: 3000 });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toastRef} />
      {children}
    </ToastContext.Provider>
  );
};

// Custom Hook to use Toast
export const useToast = () => useContext(ToastContext);
