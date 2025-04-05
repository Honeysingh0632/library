import React, { useState, useEffect } from "react";
import "./Nvabar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai"; // Animated close icon
import { Link, NavLink } from "react-router-dom";
import { IoBookSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout2, TbPasswordUser } from "react-icons/tb";
import { FaShoppingCart } from "react-icons/fa";
import { baseurl } from "../Config/config";
import { useAuth } from '../store/auth';


const Rugh = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { data, isLoading } = useAuth(); // Use Auth Context for user data

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const token = localStorage.getItem("token");
  //     try {
  //       const response = await fetch(`${baseurl}/singleuser`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `${token}`,
  //         },
  //       });

  //       if (!response.ok) throw new Error("Network response was not ok");

  //       const result = await response.json();
  //       console.log("API Result:", result);

  //       if (result && result.message) {
  //         setData(result.message);
  //       } else {
  //         setError("No data found in response");
  //       }
  //     } catch (error) {
  //       console.error("Fetch error:", error);
  //       setError(error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    toast.info('Logged out successfully'); // Show logout message

    setTimeout(() => {
        window.location.href = "/"; // Force reload and redirect to home page
    }, 1000); // Delay for smoother transition
};

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="main-nav navbar">
        {/* Logo */}
        <div className="nav1">
          <h1 className="fs-2">
            <i className="me-5 bold-text">
              <IoBookSharp />
            </i>
            Library
          </h1>
        </div>

        {/* Menu Links */}
        <div className={showMediaIcons ? "menu-link mobile-menu-link active" : "menu-link"}>
          <ul>
            <li>
              <NavLink to="/" className="a2">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" className="a2">About</NavLink>
            </li>
            <li>
              <NavLink to="/service" className="a2">Services</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="a2">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/NewAdd" className="a2">New Addition</NavLink>
            </li>
            <li>
              <NavLink to="/BookSugguest" className="a2">Book Suggest</NavLink>
            </li>
            <li>
              <NavLink to="/User-profile" className="a2 hide-on-desktop">Profile</NavLink>
            </li>

            {/* Profile Dropdown */}
            <div className="profile-dropdown hide-on-mobile">
              <i className="profile" onClick={toggleDropdown}>
                <CgProfile />
              </i>

              {isOpen && (
                <div className="dropdown-menu text-start text-light p-3">
                  {data ? (
                    <div>
                      <h3>{data.firstName} {data.lastName}</h3>
                      <p><strong>Email:</strong> {data.email}</p>
                    </div>
                  ) : (
                    <p className="text-light">
                      <Link to="/signup" className="text fs-4">Register or Log in</Link>
                    </p>
                  )}

                  <p className="text-light fs-4">
                    <CgProfile />
                    <Link to='/user' className="link text-hov"> My Profile</Link>
                  </p>
                  <p className="text-light fs-3">
                    <IoSettingsOutline />
                    <Link to="/Editprofile" className="text fs-4 link text-hov">Edit Profile</Link>
                  </p>
                  <p className="text-light fs-3">
                    <TbPasswordUser />
                    <Link to="/Changepassword" className="text fs-4 link text-hov">Change Password</Link>
                  </p>
                  <p className="text-light fs-3">
                    <FaShoppingCart />
                    <Link to="/OrderList" className="text fs-4 link text-hov">Orders</Link>
                  </p>

                  <button onClick={handleLogout} className="logout">
                    <TbLogout2 /> Log Out
                  </button>
                </div>
              )}
            </div>
          </ul>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="social-media">
          <div className="hamburger-menu" onClick={() => setShowMediaIcons(!showMediaIcons)}>
            {showMediaIcons ? (
              <AiOutlineClose className="icon-close animated-close" />
            ) : (
              <GiHamburgerMenu className="icon-white animated-hamburger" />
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Rugh;
