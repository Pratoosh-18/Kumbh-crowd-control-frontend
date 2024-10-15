import React from 'react';
import CCTVDashboardLocal from '../components/CCTVDashboardLocal/CCTVDashboardLocal';

const Dashboard = () => {
  return (
    <div className=''>
      <div className="bg-[#664343] p-4 text-white text-xl">CCTV Dashboard</div>
      <div className="flex w-full h-auto">
        <CCTVDashboardLocal />
      </div>
    </div>
  );
};

export default Dashboard;
