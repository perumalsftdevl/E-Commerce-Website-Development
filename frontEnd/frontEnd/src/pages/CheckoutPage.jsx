import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { triggerCartEvent } from "../slices/cartEventSlice";
import { useDispatch } from "react-redux";
import { addorders } from "../services/apiService";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Load cart items from LocalStorage
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);
  }, []);

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.sellingPrice * item.quantity,
      0
    );
  };

  // Place order
  const handlePlaceOrder = async () => {
    if (!address) {
      alert("Please enter your address");
      return;
    }

    try {
      const data = await addorders({ ...cartItems, ...address });

      toast.success("Login Successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response?.data?.msg, {
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

    localStorage.removeItem("cart");
    alert("Order placed successfully!");
    dispatch(triggerCartEvent());

    navigate("/");
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl text-center mb-6">Checkout</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <div>
          <ul className="space-y-4 mx-44">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover"
                />
                <span>{item.name}</span>
                <span>
                  {item.quantity} x ₹{item.sellingPrice}
                </span>
              </li>
            ))}
          </ul>
          <div className="text-right mt-6 mx-44">
            <h2 className="text-xl">Total: ₹{calculateTotal()}</h2>
          </div>
          <div className="mt-6 mx-44">
            <label className="block mb-2">Shipping Address:</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border border-gray-300"
              rows="4"
              required
            />
          </div>
          <div className="mt-6 mx-44 text-end">
            <button
              onClick={handlePlaceOrder}
              className="bg-green-500 text-white px-4 py-2 mt-4 text-end"
            >
              Place Order (Cash on Delivery)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
