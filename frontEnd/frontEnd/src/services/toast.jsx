// /src/services/toast.js

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Toaster = ({ status, msg }) => {
  return (
    <>
      <ToastContainer />
      {notify()} {/* Trigger the toast notification */}
    </>
  );
};
