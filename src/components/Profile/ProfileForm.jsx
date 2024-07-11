import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../Loader/Loading";

const ProfileForm = () => {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formUploading,setFormUploading] = useState(false);

  const user1 = JSON.parse(localStorage.getItem("user"));
  console.log(user1);

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
      setBio(response.data.bio);
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, [user1._id]);

  const handleUpdateProfile = async (e) => {
    setFormUploading(true);
    e.preventDefault();
    if (profilePicture && !profilePicture.type.startsWith("image/")) {
      toast.error("Please upload only image files.");
    }

    const formData = new FormData();
    formData.append("bio", bio);
    if (profilePicture) formData.append("profilePicture", profilePicture);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/auth/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/formdata",
          },
        }
      );
      toast.success("Profile updated successfully!");
      fetchProfile();
      setIsModalOpen(false);
      setFormUploading(false);
      
    } catch (error) {
      console.error("Error updating profile", error);
      setFormUploading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!user) return <p>Loading...</p>;

  if(formUploading) {
    return(
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    )
  }
  return (
    <div className="w-[600px] mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex p-6">
        <div className="flex-shrink-0">
          <img
            src={`${process.env.REACT_APP_API_URL}/${user.profilePicture}`}
            alt="Profile"
            className="rounded-full h-24 w-24 border-4 border-white"
          />
        </div>
        <div className="ml-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-gray-600">{user.email}</p>

          <p className="whitespace-wrap w-[600px] max-w-[600px]">{user?.bio && user.bio}</p>
          {/* for my reference */}
          <p className="whitespace-wrap w-[600px] max-w-[600px]">{user?.password}</p>
          <button
            onClick={openModal}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength="500"
                placeholder="Enter your bio"
                className="border p-2 rounded-md w-full focus:outline-none focus:border-blue-500"
              ></textarea>
              <input
                type="file"
                onChange={(e) => setProfilePicture(e.target.files[0])}
                className="border p-2 rounded-md w-full focus:outline-none focus:border-blue-500"
              />
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
