import React from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { cameras } from '../../Constants/Cameras';

const CCTVDashboardInputs = () => {
  return (
    <div className="cctv-grid">
      {cameras.map((camera) => (
        <div key={camera.id} className="cctv-camera">
          <h3>{camera.label}</h3>
          <VideoPlayer url={camera.url} />
        </div>
      ))}
    </div>
  );
};

export default CCTVDashboardInputs;
