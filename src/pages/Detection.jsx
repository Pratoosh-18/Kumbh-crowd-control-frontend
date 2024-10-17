import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext';
import VideoStream from '../components/VideoKK/VideoStream';
import VideoUpload from '../components/VideoKK/VideoUpload';
import DetectionVideoInfo from '../components/Detection/DetectionVideoInfo';

const Detection = () => {
  const { streamData, customUploadFileList } = useAppContext();
  const [activeModel, setActiveModel] = useState("crowd_detection");
  const [activeUploadFileIdx, setActiveUploadFileIdx] = useState(-1);
  const [useWebcam, setUseWebcam] = useState(false);

  const handleToggleWebcam = () => {
    setUseWebcam(prevState => !prevState);
  };

  return (
    <div className='flex xl:flex-row justify-between m-3 md:m-10 gap-2 xl:gap-5 flex-col'>
      <div className='flex w-[100%] gap-6'>
        <div className='w-[100%]'>
          {/* Detection Mode Selection */}
          <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
            <div className='flex justify-center items-center gap-2'>
              <span className='text-sm md:text-base'>Detect: </span>
              <select
                value={activeModel}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100px] md:w-[180px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setActiveModel(e.target.value)}
              >
                <option value="crowd_detection">Crowd</option>
                <option value="weapon_detection">Weapon</option>
              </select>

              {!useWebcam && (
                <>
              <span className='text-sm md:text-base'>Video Source: </span>
                <select
                  value={activeUploadFileIdx}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100px] md:w-[180px]  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setActiveUploadFileIdx(e.target.value)}
                  >
                  <option value={-1}>Default</option>
                  {customUploadFileList.map((filename, idx) => (
                    <option key={filename} value={idx}>
                      {filename}
                    </option>
                  ))}
                </select>
                  </>
              )}


            </div>
            {/* Webcam Toggle */}
            <div className="flex items-center gap-2">
              <span>Use Webcam: </span>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={useWebcam}
                  onChange={handleToggleWebcam}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
              </label>
            </div>
          </div>

          {/* Video Stream */}
          <div>
            <VideoStream
              activeModel={activeModel}
              useWebcam={useWebcam}
              uploadFileIdx={activeUploadFileIdx}
            />
          </div>
        </div>
      </div>

      {/* Video Player and Info */}
      <div className='flex mt-6'>
        <DetectionVideoInfo count={streamData?.active_persons} />
      </div>
    </div>
  )
}

export default Detection;
