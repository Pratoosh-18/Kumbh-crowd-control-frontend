import React, { useState } from 'react'
import CrowdDetection from '../components/Crowdetection/CrowdDetection';
import FaceDetection from '../components/FaceDetection/FaceDetection';
import WeaponDetection from '../components/WeaponDetection/WeaponDetection';

const Detection = () => {

  const [detectionMode, setDetectionMode] = useState('Crowd detection');

  const handleSelectChange = (event) => {
    setDetectionMode(event.target.value);
  };

  const renderDetectionComponent = () => {
    switch (detectionMode) {
      case 'Crowd detection':
        return <CrowdDetection />;
      case 'Face detection':
        return <FaceDetection />;
      case 'Weapon detection':
        return <WeaponDetection />;
      default:
        return null;
    }
  };

  return (
    <div className='flex flex-col justify-between m-10'>
      <div className='w-40'>
        <select 
          id="detection-mode" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[250px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          value={detectionMode}
          onChange={handleSelectChange}
        >
          <option value="Crowd detection">Crowd detection</option>
          <option value="Face detection">Face detection</option>
          <option value="Weapon detection">Weapon detection</option>
        </select>
      </div>

      <div className='flex'>
        {renderDetectionComponent()}
      </div>
    </div>
  )
}

export default Detection