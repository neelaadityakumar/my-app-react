import React, { createContext, useState, useContext, useCallback } from "react";
import ToastContainer from "../component/General/Toast/ToastContainer";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type = "info", message, duration }) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { id, type, message, duration };

    setToasts((prev) => [...prev, newToast]);

    if (duration) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};
