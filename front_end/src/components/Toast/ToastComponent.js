import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";

const ToastComponent = ({ data = "TYEst", type = "success", autoClose = 5000 }) => {
  const { notifications } = useNotificationCenter();
  const showToast = () => {
    // type === "success" ? toast.success(data) : toast(data);
    switch (type) {
      case "success":
        toast.success(data);
        break;
      case "info":
        toast.info(data);
        break;
      case "error":
        toast.error(data);
        break;
      case "warning":
        toast.warning(data);
        break;
      default:
        toast(data);
    }
  };
  useEffect(() => {
    showToast();
  }, []);
  return (
    <div>
      <ToastContainer autoClose={autoClose} />
    </div>
  );
};

export default ToastComponent;
