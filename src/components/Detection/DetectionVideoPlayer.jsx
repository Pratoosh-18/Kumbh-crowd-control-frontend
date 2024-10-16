import React, { useState } from 'react'
import CCTVVideoPlayer from '../VideoPlayer/CCTVVideoPlayer'
import useVideoStreams from '../../hooks/useLocalVideoStreams'

const DetectionVideoPlayer = () => {
    const [useWebcam, setUseWebcam] = useState(false);
    const [detectionMode, setDetectionMode] = useState('Crowd detection');

    const handleToggle = () => {
        setUseWebcam(prev => !prev);
    };

    const handleSelectChange = (event) => {
        setDetectionMode(event.target.value);
    };

    const videoStreams = useVideoStreams();
    const [videoDetails, setVideoDetails] = useState({});

    const handleVideoDetailsChange = (index, details) => {
        setVideoDetails((prevDetails) => ({
            ...prevDetails,
            [index]: { ...prevDetails[index], ...details },
        }));
    };

    return (
        <div className='w-[60%] flex flex-col items-center p-5'>
            <div className='flex w-[100%] justify-between px-4 py-2'>
                
                <form>
                    <label htmlFor="detection-mode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Select Detection Mode
                    </label>
                    <select 
                        id="detection-mode" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        value={detectionMode}
                        onChange={handleSelectChange}
                    >
                        <option value="Crowd detection">Crowd detection</option>
                        <option value="Face detection">Face detection</option>
                        <option value="Weapon detection">Weapon detection</option>
                    </select>
                </form>

                <label className="inline-flex items-center cursor-pointer">
                    <span className="ms-3 text-sm mx-4">
                        Use Webcam
                    </span>
                    <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={useWebcam} 
                        onChange={handleToggle}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
            </div>

            <div className="mb-2 text-lg">
                Current Mode: <strong>{detectionMode}</strong>
            </div>

            {useWebcam ? (
                <div className="flex flex-wrap gap-5 justify-center p-4 w-full">
                    {videoStreams.map((camera, index) => (
                        <div key={index} className="cctv-camera flex flex-col">
                            <h3>{camera.label}</h3>
                            <CCTVVideoPlayer
                                stream={camera.stream}
                                onVideoDetailsChange={(details) =>
                                    handleVideoDetailsChange(index, details)
                                }
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className='h-[400px] w-[100%] bg-slate-800 rounded-lg flex justify-center items-center text-2xl text-white'>
                    Live video from backend detecting people
                </div>
            )}
        </div>
    );
};

export default DetectionVideoPlayer;
