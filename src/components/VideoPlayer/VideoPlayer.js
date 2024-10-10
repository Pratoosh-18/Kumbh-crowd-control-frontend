import React, { useEffect, useRef } from 'react';

const VideoPlayer = ({ stream, url, muted = true }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    } else if (url && videoRef.current) {
      videoRef.current.src = url;
      videoRef.current.load();
    }
  }, [stream, url]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted={muted}
      controls={!stream} 
      className="h-[400px] w-[600px]"
    />
  );
};

export default VideoPlayer;
