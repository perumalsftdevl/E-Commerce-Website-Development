const express = require("express");
const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    } else {
      const order = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  })
);

router.get(
  "/myorders",
  protect,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  })
);

router.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "id name");
    res.json(orders);
  })
);

module.exports = router;
