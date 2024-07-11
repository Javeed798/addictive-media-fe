import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const logout = () => {
    localStorage.clear();
    toast.success("Logout Successfull");
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to={"/profile"} className="text-lg font-semibold">
            Addictive Media
          </Link>
        </div>
        <div className="flex space-x-4">
          {token && (
            <>
              <Link to={"/profile"}>Profile</Link>
              <Link to={"/all-users"}>All Users</Link>
              <p onClick={logout}>Logout</p>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
