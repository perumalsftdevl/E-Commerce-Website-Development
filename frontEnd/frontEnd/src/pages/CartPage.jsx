import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetCartEvent, triggerCartEvent } from "../slices/cartEventSlice";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
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

  // Remove item from cart
  const removeItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    dispatch(resetCartEvent()); // Reset the event to prevent multiple triggers
    dispatch(triggerCartEvent()); // Dispatch the event

    // Update LocalStorage
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl text-center mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p>Your cart is empty.</p>
          <Link to="/" className="text-blue-500">
            Go Shopping
          </Link>
        </div>
      ) : (
        <div>
          <ul className="space-y-4 mx-44">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover"
                />
                <span>{item.name}</span>
                <span>
                  {item.quantity} x ₹{item.sellingPrice}
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="text-right mt-6 mx-44">
            <h2 className="text-xl">Total: ₹{calculateTotal()}</h2>
            <button
              onClick={() => navigate("/checkout")}
              className="bg-blue-500 text-white px-4 py-2 mt-4"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
