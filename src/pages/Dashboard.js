import React from 'react';
import CCTVDashboardLocal from '../components/CCTVDashboardLocal/CCTVDashboardLocal';

const Dashboard = () => {
  return (
    <div className='h-[100vh]'>
      <div className="bg-[#824943] p-4 text-white text-xl">Dashboard</div>
      <div className="flex w-full h-auto">
        <CCTVDashboardLocal />
      </div>
    </div>
  );
};

export default Dashboard;
