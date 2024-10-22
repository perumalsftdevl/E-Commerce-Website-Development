/* eslint-disable react/prop-types */
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { triggerCartEvent } from "../slices/cartEventSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart(product));
    dispatch(triggerCartEvent()); // Dispatch the event
  };

  return (
    <div className="border p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <h3 className="text-xl">{product.name}</h3>
      <p className="text-red-500 font-bold text-base">
        ₹{product.sellingPrice}
      </p>
      <p className="line-through text-sm mb-2">₹{product.originalPrice}</p>{" "}
      <button
        onClick={addToCartHandler}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
