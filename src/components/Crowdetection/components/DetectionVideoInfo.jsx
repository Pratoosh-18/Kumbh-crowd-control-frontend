import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { crowdLimits } from '../../../Constants/CrowdDetection'

const DetectionVideoInfo = () => {
    const [count, setCount] = useState(69)
    const [data, setData] = useState([])
    const threshold = crowdLimits.threshold
    const [exceededTime, setExceededTime] = useState(0)
    const [alertStatus, setAlertStatus] = useState(false)
    const [lastUpdated, setLastUpdated] = useState(new Date())

    const generateRandomCount = () => {
        return Math.floor(Math.random() * (200 - 150 + 1)) + 150
    }

    useEffect(() => {
        const timer = setInterval(() => {
            const newCount = generateRandomCount()
            setCount(newCount)
            setLastUpdated(new Date())

            // Add new data point for the graph
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            setData(prevData => [...prevData.slice(-20), { time, count: newCount }])

            if (newCount > threshold) {
                setExceededTime(prev => prev + 1)
                if (exceededTime >= crowdLimits.exceededTime) {
                    setAlertStatus(true)
                }
            } else {
                setExceededTime(0)
                setAlertStatus(false)
            }
        }, 2000)

        return () => clearInterval(timer)
    }, [count, exceededTime, threshold])

    const maxCount = Math.max(0, ...data.map(d => d.count))

    return (
        <div className='border-2 p-4 flex flex-col items-center bg-gray-50'>
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

            <ResponsiveContainer width='100%' height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, maxCount + 100]} />  
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default DetectionVideoInfo
