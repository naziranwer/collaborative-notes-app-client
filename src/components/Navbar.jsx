import { AuthContext } from "../context/AuthContext";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  //   const user = JSON.parse(sessionStorage.getItem("user"));
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">
          Collaborative Notes
        </Link>
        <div className="flex items-center ">
          <div className="text-white mr-4">{user.name}</div>
          <div onClick={() => logout()} className="text-white cursor-pointer">
            Logout
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
