import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { crowdLimits } from '../../Constants/CrowdDetection'
import VideoUpload from '../VideoKK/VideoUpload'
import { useAppContext } from '../../context/AppContext'
import { IoMdSettings } from "react-icons/io";

const DetectionVideoInfo = ({ count }) => {
    const [data, setData] = useState([])
    const [threshold, setThreshold] = useState(crowdLimits.threshold)
    const [exceededTime, setExceededTime] = useState(0)
    const [alertStatus, setAlertStatus] = useState(false)
    const [lastUpdated, setLastUpdated] = useState(new Date())
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newThreshold, setNewThreshold] = useState(threshold)
    const [newExceededTime, setNewExceededTime] = useState(crowdLimits.exceededTime)
    const { customUploadFileList } = useAppContext();

    useEffect(() => {
        const timer = setInterval(() => {
            setLastUpdated(new Date())

            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            setData(prevData => [...prevData.slice(-20), { time, count }])

            if (count > threshold) {
                setExceededTime(prev => prev + 1)
                if (exceededTime + 1 >= newExceededTime) {
                    setAlertStatus(true)
                }
            } else {
                setExceededTime(0)
                setAlertStatus(false)
            }
        }, 500)

        return () => clearInterval(timer)
    }, [count, threshold, exceededTime, newExceededTime])

    const maxCount = Math.max(0, ...data.map(d => d.count))

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleThresholdChange = () => {
        setThreshold(newThreshold)
        crowdLimits.exceededTime = newExceededTime
        closeModal()
    }

    return (
        <div className='border-2 p-4 flex flex-col items-center bg-gray-50 w-[100%]'>
            <div className='w-full flex flex-row-reverse'>
                <button onClick={openModal} className="">
                    <IoMdSettings className='w-6 h-6'/>
                </button>
            </div>
            <h2 className='text-lg font-bold mb-2'>Crowd Detection Info</h2>

            <div className='text-xl mb-2'>
                <strong>Person Count:</strong> {count}
            </div>

            <div className={`text-lg mb-2 ${count > threshold ? 'text-red-600' : 'text-green-600'}`}>
                <strong>Status:</strong> {count > threshold ? 'Over Threshold' : 'Normal'}
            </div>

            <div className='text-md mb-2'>
                <strong>Threshold:</strong> {threshold} people
            </div>

            <div className='text-md mb-2'>
                <strong>Time Exceeded:</strong> {exceededTime}s
            </div>

            <div className={`text-md font-semibold mb-2 ${alertStatus ? 'text-red-600' : 'text-gray-600'}`}>
                <strong>Alert Status:</strong> {alertStatus ? 'Alert! Too many people for too long!' : 'No Alert'}
            </div>

            <div className='text-sm text-gray-600 mb-4'>
                <strong>Last Updated:</strong> {lastUpdated.toLocaleTimeString()}
            </div>

            <VideoUpload />

            <div>
                <h3>Custom Upload Filelist</h3>
                <div className="mt-2 space-y-2 text-[15px]">
                    {customUploadFileList.map((filename) => (
                        <p key={filename}>┗ {filename}</p>
                    ))}
                </div>
            </div>

            <ResponsiveContainer width='100%' height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, maxCount]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg max-w-md">
                        <h2 className="text-lg font-semibold mb-4">Threshold</h2>
                        <input
                            type="number"
                            value={newThreshold}
                            onChange={(e) => setNewThreshold(Number(e.target.value))}
                            className="border p-2 w-full mb-4"
                            placeholder="Set new threshold"
                        />
                        <h2 className="text-lg font-semibold mb-4">Exceeded Time</h2>
                        <input
                            type="number"
                            value={newExceededTime}
                            onChange={(e) => setNewExceededTime(Number(e.target.value))}
                            className="border p-2 w-full mb-4"
                            placeholder="Set new exceeded time"
                        />
                        <div className="flex justify-end">
                            <button onClick={closeModal} className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2">Cancel</button>
                            <button onClick={handleThresholdChange} className="bg-blue-500 text-white px-4 py-2 rounded">Set</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DetectionVideoInfo
