const VideoStream = ({ activeModel, useWebcam, uploadFileIdx }) => {
    return (
      <div className="my-5 border-2 flex justify-center items-center min-h-[500px] rounded-md">
        <img
          src={`http://localhost:8000/stream-video?active_model=${activeModel}&use_webcam=${useWebcam}&upload_file_idx=${uploadFileIdx}`}
          alt="Video Stream"
          className="max-h-[72vh]"
        />
      </div>
    );
  };
  
  export default VideoStream;