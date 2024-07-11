import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../Loader/Loading";

const AddVideo = () => {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  
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
        setVideos(response.data.videos)
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };

    fetchProfile();
  }, [user1._id]);


  const handleAddVideo = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", video);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/video/upload`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Video uploaded Successfully");
      closeModal();
      setLoading(false);
    } catch (error) {
      console.error("Error uploading video", error);
      setLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setDescription("");
    setVideo(null);
  };

  if(loading) {
    return(
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    )
  }

  return (
    <div className="flex">
      {/* Video List Section */}
      <div className="w-1/2 p-4 flex flex-col">
        <h2 className="text-2xl  font-semibold mb-7">Your Videos</h2>
        <ul className="space-y-4">
          {videos.slice(0,5).map((video) => (
            <li key={video._id} className="flex  items-center">
              <video
                src={`${process.env.REACT_APP_API_URL}/${video.videoPath}`}
                className="h-24 w-32"
                controls
              ></video>
              <div className="ml-4">
                <h3 className="font-semibold">{video.title}</h3>
                <p className="text-gray-600">{video.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Add Video</h2>
            <form onSubmit={handleAddVideo} className="space-y-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength="30"
                placeholder="Title"
                required
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength="120"
                placeholder="Description"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500"
              ></textarea>
              <input
                type="file"
                accept="video/mp4"
                onChange={(e) => setVideo(e.target.files[0])}
                required
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500"
              />
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
                >
                  Upload Video
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

      {/* Add Video Button */}
      <div className="w-1/2 p-4">
        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Add Video
        </button>
      </div>
    </div>
  );
};

export default AddVideo;
