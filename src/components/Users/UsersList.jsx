import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/auth/all-users`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {users.map((user) => (
        <div key={user._id} className="border my-4 p-14">
          <div className="flex items-center">
            <img
                  src={`${process.env.REACT_APP_API_URL}/${user.profilePicture}`}
                  alt={`${user.firstName} ${user.lastName}`}
              className="rounded-full h-16 w-16 mr-4"
            />
            <h2 className="text-xl font-semibold">
              {user.firstName} {user.lastName}
            </h2>
            <Link
              to={`/users/${user.firstName}/videos`}
              className="text-blue-500 hover:text-blue-700 mt-2 ml-10 items-center justify-center block"
            >
              View All Videos
            </Link>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-32">
            {user.videos.slice(0, 5).map((video) => (
              <div key={video._id} className="my-2">
                <p className="text-lg font-medium">{video.title}</p>
                <p>{video.description}</p>
                <video
                  src={`${process.env.REACT_APP_API_URL}/${video.videoPath}`}
                  className="h-52  w-60"
                  controls
                ></video>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
