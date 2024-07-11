import React from "react";
import UserVideos from "../components/Users/UsersVideos";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserVideosPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="ml-10 mt-12">
        <FaArrowCircleLeft onClick={() => navigate(-1)} className="cursor-pointer" size={30} title="Back" />
      </div>{" "}
      <UserVideos />
    </div>
  );
};

export default UserVideosPage;
