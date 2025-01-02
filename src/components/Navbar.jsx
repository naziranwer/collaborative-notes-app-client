import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gradient-to-r from-[#f3ca25] to-[#f3b625] p-4 py-6 fixed w-full top-0 shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-gray-800 text-lg font-bold hover:text-gray-600 transition duration-300"
        >
          <img src="/peerNote.png" alt="logo" className="h-10 w-36  " />
        </Link>
        <div className="flex items-center">
          {/* <div className="text-gray-800 mr-4 hover:text-gray-600 font-bold">
            {user.name}
          </div> */}
          <Avatar name={user.name} />
          <div
            onClick={() => logout()}
            className="text-gray-800 cursor-pointer hover:text-gray-600 font-bold transition duration-300"
          >
            Logout
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
