import React from 'react';
import CCTVDashboardLocal from '../components/CCTVDashboardLocal/CCTVDashboardLocal';

const Dashboard = () => {
  return (
    <>
      <div className="bg-orange-400 p-4 text-white text-xl">Dashboard</div>
      <div className="flex gap-5 w-full h-auto justify-center">
        <div>
          <CCTVDashboardLocal />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
