import React, { useEffect, useState } from 'react';
import { Container, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../../appwrite/auth'; // Import the auth service
import { login, logout } from '../../store/authSlice'; // Import Redux actions

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData); // Get user data from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex items-center justify-between h-[6vw]'>
          <div className='mr-4'>
            <Link to='/'>
              <h1>Logo</h1>
            </Link>
          </div>
          <ul className='flex gap-12 ml-auto items-center'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-block px-6 py-2 cursor-pointer duration-200 hover:bg-blue-100 rounded-full'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <>
                <li>
                  <LogoutBtn />
                </li>
                <li className="text-white font-bold mr-4"> {userName}👤</li>
              </>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
