import React from "react";
import UsersList from "../components/Users/UsersList";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";

const UsersPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="ml-10 mt-12">
        <FaArrowCircleLeft
          onClick={() => navigate(-1)}
          className="cursor-pointer"
          size={30}
          title="Back"
        />
      </div>{" "}
      <h2 className="font-bold text-2xl ml-10 flex items-center justify-center mt-10">
        All Users List
      </h2>
      <UsersList />
    </div>
  );
};

export default UsersPage;
