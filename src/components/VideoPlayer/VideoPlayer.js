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
      className="w-fit h-[300px] border-4 rounded-md"
    />
  );
};

export default VideoPlayer;
