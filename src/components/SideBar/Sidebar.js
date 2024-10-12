import React from 'react';

const Sidebar = ({ cameras, videoDetails }) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="bg-gray-800 text-white w-[30vw] h-full p-4">
      <h2 className="text-lg font-bold mb-4">Connected Cameras</h2>
      <ul className="space-y-2">
        {cameras.map((camera, index) => (
          <li key={index} className="bg-gray-700 p-2 rounded-md hover:bg-gray-600">
            <p className="font-medium">Camera: {camera.label}</p>
            {videoDetails[index] && (
              <div className="text-sm">
                <p>Current Time: {formatTime(videoDetails[index].currentTime || 0)}</p>
                <p>
                  Resolution: {videoDetails[index].resolution?.width}x
                  {videoDetails[index].resolution?.height}
                </p>
                <p>Buffered: {formatTime(videoDetails[index].buffered || 0)}</p>
                <p>Playback Rate: {videoDetails[index].playbackRate || 1}x</p>
                <p>Duration: {formatTime(videoDetails[index].duration || 0)}</p>
                <p>Volume: {(videoDetails[index].volume * 100).toFixed(0)}%</p>
                <p>Status: {videoDetails[index].isPaused ? 'Paused' : 'Playing'}</p>
                <p>Muted: {videoDetails[index].isMuted ? 'Yes' : 'No'}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
