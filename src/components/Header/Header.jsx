import React, { useEffect, useState } from "react";
import { Container, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {Logo} from "../index";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons
import authService from "../../appwrite/auth"; // Import auth service
import { login, logout } from "../../store/authSlice"; // Import Redux actions

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData); // Get user data from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Fetch logged-in user's data
    const fetchUser = async () => {
      const user = await authService.getCurrentUser();
      if (user) {
        setUserName(user.name);
        dispatch(login({ userData: user })); // Store user data in Redux
      } else {
        setUserName("");
        dispatch(logout()); // Clear user data in Redux
      }
    };

    fetchUser();
  }, [dispatch]);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="w-full bg-[#dadada]">
      <Container>
        <nav className="w-full gap-12 lg:h-[4vw] md:h[6vw] flex items-center justify-between">
          {/* Logo */}
          <div className="text-black font-bold text-3xl ">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          {/* Hamburger Menu Button (Mobile Only) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-black text-3xl"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>

          {/* Navigation Links - Default Hidden on Mobile */}
          <ul
            className={`absolute md:static left-0 top-9 lg:gap-12 lg:text-[1.4vw]  lg:rounded-lg w-full md:w-auto bg-[#a4a4a4] md:bg-transparent flex flex-col md:flex-row items-center md:space-x-6 transition-all duration-300 ${
              isOpen ? "block" : "hidden md:flex"
            }`}
          >
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name} className="w-full md:w-auto text-center">
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        setIsOpen(false); // Close menu on click
                      }}
                      className="block px-6 py-3 cursor-pointer lg:rounded-lg text-black  hover:bg-gray-300 w-full md:w-auto transition-all duration-300"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {/* Authenticated User Menu */}
            {authStatus && (
              <>
                <li>
                  <LogoutBtn />
                </li>
                <li className="text-black font-bold">{userName}<span className="lg:text-[1.6vw]">👦🏻</span></li>
              </>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
