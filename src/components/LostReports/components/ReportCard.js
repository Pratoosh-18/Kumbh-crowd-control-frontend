import React, { useState } from 'react';
import { useLostReports } from '../../../context/LostReportsContext';
import ConfirmModal from '../../Modal/ConfirmModal';

const ReportCard = ({ person }) => {
  const { lostReports, setLostReports } = useLostReports();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);

  const handleMarkAsFound = () => {
    const updatedReports = lostReports.map((p) =>
      p.name === person.name ? { ...p, status: 'found' } : p
    );
    setLostReports(updatedReports);
  };

  const handleMarkAsNotDetected = () => {
    const updatedReports = lostReports.map((p) =>
      p.name === person.name ? { ...p, status: 'lost' } : p
    );
    setLostReports(updatedReports);
  };

  const handleMarkAsDetected = () => {
    const updatedReports = lostReports.map((p) =>
      p.name === person.name ? { ...p, status: 'detected' } : p
    );
    setLostReports(updatedReports);
  };

  const openConfirmModal = (action) => {
    setCurrentAction(action);
    setIsModalOpen(true);
  };

  const confirmAction = () => {
    if (currentAction === 'found') {
      handleMarkAsFound();
    } else if (currentAction === 'lost') {
      handleMarkAsNotDetected();
    } else if (currentAction === 'detected') {
      handleMarkAsDetected();
    }
    setIsModalOpen(false); 
  };

  const getCardBg = (status) => {
    const statusMap = {
      detected: 'bg-green-200',
      lost: 'bg-red-200',
      found: 'white'
    };
  
    return statusMap[status] || 'default-bg';
  };

  // Determine the confirm button color based on the action
  const getConfirmButtonColor = () => {
    switch (currentAction) {
      case 'found':
        return 'bg-blue-500';
      case 'lost':
        return 'bg-red-500';
      case 'detected':
        return 'bg-green-500';
      default:
        return 'bg-gray-500'; // Fallback color
    }
  };

  return (
    <>
      {/* The main report card */}
      <div className={`flex items-center p-4 shadow-md ${getCardBg(person.status)}`}>
        <img
          src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`}
          alt={person.name}
          className="w-44 h-44 object-cover mr-4"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold">{person.name}</h3>
          <p>Age: {person.age}</p>
          <p>Last Seen: {person.lastSeen}</p>
          <p>Parent: {person.parentName}</p>
          <p>Phone: {person.phone}</p>
          <p>Email: {person.mail}</p>
          <p>Status: {person.status}</p>
        </div>
        <div className="ml-4 space-x-2">
          {/* Mark as Found Button */}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            onClick={() => openConfirmModal('found')}
            disabled={person.status === 'found'}
          >
            Mark as Found
          </button>

          {/* Mark as Not Detected Button */}
          <button
            className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
            onClick={() => openConfirmModal('lost')}
            disabled={person.status === 'lost'}
          >
            Mark as Not Detected
          </button>

          {/* Mark as Detected Button */}
          <button
            className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300"
            onClick={() => openConfirmModal('detected')}
            disabled={person.status !== 'lost'}
          >
            Mark as Detected
          </button>
        </div>
      </div>

      {/* Confirmation modal */}
      {isModalOpen && (
        <ConfirmModal
          message={`Are you sure you want to mark ${person.name} as ${currentAction === 'found' ? 'found' : currentAction === 'lost' ? 'not detected' : 'detected'}?`}
          onConfirm={confirmAction}
          onClose={() => setIsModalOpen(false)}
          confirmMessage={currentAction === 'found' ? 'Yes, Mark as Found' : currentAction === 'lost' ? 'Yes, Mark as Not Detected' : 'Yes, Mark as Detected'}
          confirmButtonColor={getConfirmButtonColor()} // Set confirm button color dynamically
        />
      )}
    </>
  );
};

export default ReportCard;
