import React from 'react'
import DetectionVideoPlayer from '../components/Detection/DetectionVideoPlayer'
import DetectionVideoInfo from '../components/Detection/DetectionVideoInfo'

const Detection = () => {
  return (
    <div className='flex justify-between m-10'>
      <DetectionVideoPlayer/>
      <DetectionVideoInfo/>
    </div>
  )
}

export default Detection