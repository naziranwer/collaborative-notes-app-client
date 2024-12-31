import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#f2f2f7] p-4  w-full shadow-inner py-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link
            to="/system-status"
            className="text-gray-600 hover:text-gray-800 font-semibold transition duration-300"
          >
            System Status
          </Link>
          <Link
            to="/privacy-policy"
            className="text-gray-600 hover:text-gray-800 font-semibold transition duration-300"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-conditions"
            className="text-gray-600 font-semibold hover:text-gray-800  transition duration-300"
          >
            Terms & Conditions
          </Link>
        </div>
        <div className="text-gray-600 font-semibold">
          Copyright © 2024 PeerNotes. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
