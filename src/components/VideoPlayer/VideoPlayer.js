import React, { useEffect, useRef, useState } from 'react';

const VideoPlayer = ({ stream, url, muted = true, onVideoDetailsChange }) => {
  const videoRef = useRef(null);
  const [videoDetails, setVideoDetails] = useState({
    currentTime: 0,
    duration: 0,
    resolution: { width: 0, height: 0 },
    playbackRate: 1,
    volume: 1,
    buffered: 0,
    isPaused: true,
    isMuted: muted,
  });

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    } else if (url && videoRef.current) {
      videoRef.current.src = url;
      videoRef.current.load();
    }
  }, [stream, url]);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      const newVideoDetails = {
        duration: video.duration,
        resolution: { width: video.videoWidth, height: video.videoHeight },
        volume: video.volume,
        isMuted: video.muted,
      };
      setVideoDetails((prevDetails) => ({
        ...prevDetails,
        ...newVideoDetails,
      }));
      onVideoDetailsChange(newVideoDetails);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      const buffered = video.buffered.length > 0 ? video.buffered.end(0) : 0;
      const updatedDetails = {
        currentTime: video.currentTime,
        buffered,
        isPaused: video.paused,
      };
      setVideoDetails((prevDetails) => ({
        ...prevDetails,
        ...updatedDetails,
      }));
      onVideoDetailsChange(updatedDetails);
    }
  };

  return (
    <div className="relative w-fit">
      <video
        ref={videoRef}
        autoPlay
        muted={muted}
        controls={!stream}
        className="w-fit h-[500px]"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onRateChange={() =>
          setVideoDetails((prev) => ({
            ...prev,
            playbackRate: videoRef.current.playbackRate,
          }))
        }
        onVolumeChange={() =>
          setVideoDetails((prev) => ({
            ...prev,
            volume: videoRef.current.volume,
            isMuted: videoRef.current.muted,
          }))
        }
      />
    </div>
  );
};

export default VideoPlayer;
