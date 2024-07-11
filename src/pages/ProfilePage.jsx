import React, { useEffect, useState } from "react";
import ProfileForm from "../components/Profile/ProfileForm";
import AddVideo from "../components/Profile/AddVideo";
import axios from "axios";

const ProfilePage = () => {

  const [user, setUser] = useState(null);
  const user1 = JSON.parse(localStorage.getItem("user"));
  console.log(user1);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/auth/${user1._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };

    fetchProfile();
  }, [user1._id]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <ProfileForm />
      </div>
      <div>
        <AddVideo />
      </div>
    </div>
  );
};

export default ProfilePage;
