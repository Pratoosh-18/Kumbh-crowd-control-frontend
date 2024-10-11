import React from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import useVideoStreams from '../../hooks/useVideoStreams';

const CCTVDashboardLocal = () => {
  const videoStreams = useVideoStreams();

  return (
    <div className="flex flex-wrap gap-5 justify-center">
      {videoStreams.map((camera, index) => (
        <div key={index} className="cctv-camera flex flex-col">
          <h3>{camera.label}</h3>
          <VideoPlayer stream={camera.stream} />
        </div>
      ))}
    </div>
  );
};

export default CCTVDashboardLocal;
