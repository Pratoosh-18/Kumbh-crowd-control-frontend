import React, { useState } from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import useVideoStreams from '../../hooks/useVideoStreams';
import Sidebar from '../SideBar/Sidebar';


const CCTVDashboardLocal = () => {
  const videoStreams = useVideoStreams();
  const [videoDetails, setVideoDetails] = useState({});

  const handleVideoDetailsChange = (index, details) => {
    setVideoDetails((prevDetails) => ({
      ...prevDetails,
      [index]: { ...prevDetails[index], ...details },
    }));
  };

  return (
    <div className="flex min-h-[100vh]">
      <Sidebar cameras={videoStreams} videoDetails={videoDetails} />

      <div className="flex flex-wrap gap-5 justify-center p-4 w-full">
        {videoStreams.map((camera, index) => (
          <div key={index} className="cctv-camera flex flex-col">
            <h3>{camera.label}</h3>
            <VideoPlayer
              stream={camera.stream}
              onVideoDetailsChange={(details) =>
                handleVideoDetailsChange(index, details)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CCTVDashboardLocal;
