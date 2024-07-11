import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";

const UserVideos = () => {
  const { firstName } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/auth/firstName/${firstName}`
        );
        setVideos(response.data.videos);
      } catch (error) {
        console.error("Error fetching videos", error);
      }
    };

    fetchVideos();
  }, [firstName]);

  return (
    <div className="flex flex-wrap gap-10 p-10">
      {videos.map((video) => (
        <div key={video._id}>
          <p>{video.title}</p>
          <video
            src={`${process.env.REACT_APP_API_URL}/${video.videoPath}`}
            className="h-52 w-80"
            controls
          ></video>
        </div>
      ))}
    </div>
  );
};

export default UserVideos;
