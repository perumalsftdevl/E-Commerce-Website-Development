import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/userSlice";
import { resetCartEvent } from "../slices/cartEventSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [storedCartItems, setStoredCartItems] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo")); // Parse to get the user info object

  // Check user status and navigate accordingly
  useEffect(() => {
    if (!userInfo) {
      navigate("/login"); // Redirect to login if userInfo does not exist
    }
  }, [userInfo, navigate]);

  const eventTriggered = useSelector((state) => state.cartEvent.eventTriggered);

  useEffect(() => {
    if (eventTriggered) {
      const cartItemsList = JSON.parse(localStorage.getItem("cart")) || [];
      setStoredCartItems(cartItemsList); // Update stored cart items

      console.log("Item added to cart!");
      dispatch(resetCartEvent()); // Reset the event to prevent multiple triggers
    }
  }, [eventTriggered, dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem("userInfo");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex col-6 text-white items-center">
            <Link to="/" className="font-medium text-white">
              E-Commerce
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              <Link
                to="/cart"
                className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                aria-current="page"
              >
                Cart
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 mx-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  {storedCartItems.length || 0}
                </span>
              </Link>
              {userInfo && (
                <Link
                  to="/setting"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Settings
                </Link>
              )}
              {userInfo ? (
                <>
                  <span className="text-white">{userInfo.name}</span>
                  <button
                    onClick={logoutHandler}
                    className="rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link
            to="/cart"
            className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
            aria-current="page"
          >
            Cart
            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 mx-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
              {storedCartItems.length || 0}
            </span>
          </Link>
          {userInfo ? (
            <>
              <span className="text-white">{userInfo.name}</span>
              <button
                onClick={logoutHandler}
                className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 text-gray-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
