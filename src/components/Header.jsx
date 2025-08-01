import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import axios from "axios";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, setLoading } = useContext(Context);

  const logoutHandler = async () => {
    setLoading(true);
    
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });

      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  return (
    <nav className="header">
      <div>
        <h2>Todo App.</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>profile</Link>

        {isAuthenticated ? (
          <button  onClick={logoutHandler} className="btn">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
