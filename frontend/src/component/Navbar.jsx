import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaCartPlus, FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { categories } from "./category";
import { logout, setAuthFromToken } from "./authSlice";
import { PiSignInFill } from "react-icons/pi";
import SearchComponent from "./SearchComponent";
import UserMenu from "./UserMenu";

function Navbar() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const { isLoggedIn, accountType } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null); // Track hovered category

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setAuthFromToken());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful");
    navigate("/SignIn");
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSubCategoryClick = (category, subcategory) => {
    navigate(`/${category}/${subcategory}`);
    setHoveredCategory(null); // Close the dropdown when a subcategory is clicked
  };

  return (
    <div className="sticky top-0 w-full z-40 flex flex-col">
      <nav className={`bg-teal-500 w-full text-white  p-0.5 px-4 ${sidebarOpen ? "hidden" : ""}`}>
        <div className="flex h-16 justify-between items-center relative">
          {/* Logo */}
          <div className="logo flex flex-col items-center">
            <p className="hidden lg:block logo-text">Omnimart</p>
          </div>

          {/* Search component */}
          <div className="w-1/2 hidden sm:block">
            <SearchComponent />
          </div>

          {/* Hamburger icon for mobile */}
          <div className="absolute right-0 md:hidden flex items-center">
            <FaBars size={24} onClick={handleSidebarToggle} />
          </div>

          {/* Navbar links and icons */}
          <div className={`md:flex items-center space-x-4 ${sidebarOpen ? "hidden" : ""}`}>
            <Link
              to="/"
              className="hidden xl:block text-md rounded-md px-4 py-2 hover:text-white hover:bg-opacity-20 hover:bg-slate-900"
            >
              Home
            </Link>

            {accountType ? (
              accountType === "user" ? (
                <Link to="/Cart" className="hidden md:block relative w-full">
                  <FaCartPlus size={28} className="inline mr-2" />
                  {cart.length > 0 && (
                    <span className="absolute -top-4 -right-1 py-1 px-2 text-xs font-bold bg-rose-600 rounded-full">
                      {cart.length}
                    </span>
                  )}
                </Link>
              ) : accountType === "business" ? (
                <LuLayoutDashboard
                  className="hidden md:block inline p-1.5 bg-rose-400 rounded-full cursor-pointer"
                  size={32}
                  onClick={() => navigate("/businessCard")}
                />
              ) : null
            ) : null}

            {isLoggedIn ? (
              <UserMenu />
            ) : (
              <Link
                to="/signin"
                className="hidden md:block p-2 font-medium rounded-sm bg-yellow-500 hover:bg-yellow-400"
              >
                Login
                <PiSignInFill size={20} className="inline ml-2" />
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Bottom navigation with categories */}
      <ul className="w-full flex justify-center items-center gap-14 bg-teal-700 text-white text-md">
        {categories.map((category) => (
          <li
            key={category.id}
            className="relative cursor-pointer py-2 font-semibold "
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <span>{category.name}</span>
            {/* Subcategory dropdown on hover */}
            {hoveredCategory === category.id && (
              <ul className="absolute w-44 -left-8 mt-2 bg-white text-teal-500 rounded-lg shadow-lg z-30 mt-2">
                {category.subcategories.map((subCategory) => (
                  <li key={subCategory.id}>
                    <button
                      className="block text-md px-4 py-2 hover:bg-rose-400 font-normal hover:text-white hover:rounded-lg w-full text-left"
                      onClick={() => handleSubCategoryClick(category.name, subCategory.name)}
                    >
                      {subCategory.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Sidebar for mobile view */}
      <div
        className={`z-20 md:hidden fixed top-0 left-0 min-w-3/4 h-full bg-teal-500 text-white transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <p className="font-extrabold text-xl">Omnimart</p>
          <FaTimes
            size={24}
            className="hover:text-rose-400 cursor-pointer"
            onClick={handleSidebarToggle}
          />
        </div>
        <div className="flex flex-col p-4 gap-5">
          <Link
            to="/"
            className="py-2 hover:bg-slate-500 w-full rounded-md px-4"
            onClick={() => setSidebarOpen(false)}
          >
            Home
          </Link>

          {categories.map((category) => (
            <div key={category.id} className="relative py-2 hover:bg-slate-500 w-full rounded-md px-4">
              <button onClick={() => setHoveredCategory(category.id)}>
                {category.name}
              </button>
              {hoveredCategory === category.id && (
                <ul className="bg-white mt-4 border border-gray-200 rounded-lg shadow-lg text-teal-500">
                  {category.subcategories.map((subCategory) => (
                    <li key={subCategory.id}>
                      <button
                        onClick={() => handleSubCategoryClick(category.id, subCategory.id)}
                        className="block px-4 py-2 hover:bg-rose-400 rounded-lg hover:text-white w-full text-left"
                      >
                        {subCategory.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {accountType ? (
            accountType === "user" ? (
              <Link to="/Cart" className="relative w-full">
                <FaCartPlus size={28} className="inline mx-4" />
                {cart.length > 0 && (
                  <span className="absolute -top-4 left-9 py-1 px-2 text-xs font-bold bg-rose-600 rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>
            ) : accountType === "business" ? (
              <LuLayoutDashboard
                className="mx-4 inline p-1.5 bg-rose-400 rounded-full cursor-pointer"
                size={32}
                onClick={() => navigate("/businessCard")}
              />
            ) : null
          ) : null}

          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setSidebarOpen(false);
              }}
              className="py-2 px-20 font-semibold rounded-md bg-rose-600 hover:bg-rose-500"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signin"
              className="py-2 mx-auto px-20 font-semibold rounded-md bg-rose-400 hover:bg-highlight"
              onClick={() => setSidebarOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={handleSidebarToggle}
        ></div>
      )}
    </div>
  );
}

export default Navbar;
