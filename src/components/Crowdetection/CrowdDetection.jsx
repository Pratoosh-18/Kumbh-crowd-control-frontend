import React from 'react'
import DetectionVideoInfo from './components/DetectionVideoInfo'
import DetectionVideoPlayer from './components/DetectionVideoPlayer'

const CrowdDetection = () => {
  return (
    <div className='flex w-full'>
        <div className='w-[60%]'>

        <DetectionVideoPlayer />
        </div>
        <div className='w-[40%]'>

        <DetectionVideoInfo/>
        </div>
    </div>
  )
}

export default CrowdDetection