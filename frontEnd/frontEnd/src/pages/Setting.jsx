import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { products } from "../services/apiService";
import { useNavigate } from "react-router-dom";

export const Setting = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    originalPrice: "",
    discountPrice: "",
    sellingPrice: "",
    quantity: "",
    uom: "",
    hsnCode: "",
  });

  useEffect(() => {
    const originalPrice = parseFloat(formData.originalPrice) || 0;
    const discountPrice = parseFloat(formData.discountPrice) || 0;

    // Calculate selling price
    const sellingPrice = originalPrice - discountPrice;
    setFormData((prevData) => ({
      ...prevData,
      sellingPrice: sellingPrice >= 0 ? sellingPrice : 0,
      uom: formData.sellingPrice * formData.quantity,
      // Ensure selling price is not negative
    }));
  }, [
    formData.originalPrice,
    formData.discountPrice,
    formData.quantity,
    formData.sellingPrice,
  ]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: e.target.files[0], // Get the file from input
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await products(formDataToSend);
      navigate("/");
      console.log("Product created:", response.data);
      toast.success("Product created Successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Reset form or handle success
    } catch (err) {
      toast.error(err.response?.data?.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add Product
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Product Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div>
                <input
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="originalPrice"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Original Price
              </label>
              <div>
                <input
                  name="originalPrice"
                  id="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="discountPrice"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Discount Price
              </label>
              <div>
                <input
                  name="discountPrice"
                  id="discountPrice"
                  value={formData.discountPrice}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="sellingPrice"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Selling Price
              </label>
              <div>
                <input
                  name="sellingPrice"
                  id="sellingPrice"
                  readOnly
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Quantity
              </label>
              <div>
                <input
                  name="quantity"
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="uom"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                UOM
              </label>
              <div>
                <input
                  name="uom"
                  id="uom"
                  type="number"
                  readOnly
                  value={formData.uom}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="hsnCode"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                hsnCode
              </label>
              <div>
                <input
                  name="hsnCode"
                  id="hsnCode"
                  type="text"
                  value={formData.hsnCode}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Picture
              </label>
              <div>
                <input
                  name="image"
                  id="image"
                  onChange={handleChange}
                  type="file"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit Product
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};
