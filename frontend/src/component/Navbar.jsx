import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaCartPlus, FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { categories } from "./category";
import { logout, setAuthFromToken } from "./authSlice";
import SearchComponent from "./SearchComponent";
import UserMenu from "./UserMenu";
// import city from "../assets/bgImages/city.png"

function Navbar() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const { isLoggedIn, accountType } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const handleCategoryClick = (id) => {
    navigate(`/category/${id}`);
    setSidebarOpen(false);
    setDropdownOpen(false);
  };

  return (
    <div className="sticky top-0 w-full z-40">
      <nav
        className={`bg-teal-500 w-full text-white px-4 ${sidebarOpen ? "hidden" : ""
          }`}
      >
        <div className="flex h-16 justify-between items-center relative">
          {/* Logo */}
          <div className="logo flex flex-col items-center">
            {/* <img src={city} className="w-16" alt="" /> */}
            <p className="hidden lg:block font-extrabold text-md">Omnimart</p>
          </div>

          {/* Search component */}
          <div className="w-1/3 hidden sm:block">
            <SearchComponent />
          </div>

          {/* Hamburger icon and Sidebar */}
          <div className="absolute right-0 md:hidden flex items-center">
            <FaBars size={24} onClick={handleSidebarToggle} />
          </div>

          {/* Navbar links and icons */}
          <div
            className={`md:flex items-center space-x-4 ${sidebarOpen ? "hidden" : ""
              }`}
          >
            <Link
              to="/"
              className="hidden xl:block rounded-md px-4 py-2 hover:text-white hover:bg-opacity-20 hover:bg-slate-900"
            >
              Home
            </Link>

            <div className="relative inline-block">
              <button
                className="hidden md:block rounded-md px-4 py-2 hover:text-white hover:bg-slate-900 hover:bg-opacity-20 p-3"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                Categories
              </button>
              {dropdownOpen && (
                <ul
                  className="absolute -left-5 w-48 bg-white mt-1 border border-gray-200 z-20 rounded-lg shadow-lg text-teal-500"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => handleCategoryClick(category.id)}
                        className="block w-full text-left px-4 py-2 hover:bg-rose-400 rounded-lg hover:text-white"
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

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
                className="hidden md:block px-4 py-1 font-semibold rounded-md bg-rose-400 hover:bg-bg-rose-500"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar for mobile view */}
      <div
        className={`z-20 md:hidden fixed top-0 left-0 min-w-3/4 h-full bg-teal-500 text-white transition-transform transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
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
          <div className="relative py-2 hover:bg-slate-500 w-full rounded-md px-4">
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              Categories
            </button>
            {dropdownOpen && (
              <ul className="bg-white mt-4 border border-gray-200 rounded-lg shadow-lg text-teal-500">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => handleCategoryClick(category.id)}
                      className="block px-4 py-2 hover:bg-rose-400 rounded-lg hover:text-white w-full text-left"
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {accountType ? (
            accountType === "user" ? (
              <Link to="/Cart" className="relative w-full">
                <FaCartPlus size={28} className="inline  mx-4" />
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
