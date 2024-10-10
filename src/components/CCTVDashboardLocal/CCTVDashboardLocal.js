import React, { useEffect, useState } from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

const CCTVDashboardLocal = () => {
  const [videoStreams, setVideoStreams] = useState([]);

  useEffect(() => {
    const getCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        const streams = await Promise.all(videoDevices.map(async (device) => {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: device.deviceId },
            audio: false
          });
          return { stream, label: device.label || `Camera ${device.deviceId}` };
        }));

        setVideoStreams(streams);
      } catch (err) {
        console.error('Error accessing local cameras:', err);
      }
    };

    getCameras();

    return () => {
      videoStreams.forEach(({ stream }) => {
        stream.getTracks().forEach(track => track.stop());
      });
    };
  }, []);

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
