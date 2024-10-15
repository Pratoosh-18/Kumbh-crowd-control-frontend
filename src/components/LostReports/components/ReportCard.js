import React, { useState } from 'react';
import { useLostReports } from '../../../context/LostReportsContext';
import ConfirmModal from '../../Modal/ConfirmModal';
import { updateLostPersonReport } from '../../../helper/APICalls';

const statusActions = {
  found: { message: 'found', color: 'bg-blue-500' },
  lost: { message: 'not detected', color: 'bg-red-500' },
  detected: { message: 'detected', color: 'bg-green-500' },
};

const ReportCard = ({ person }) => {
  const { lostReports, setLostReports } = useLostReports();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);

  const updateReportStatus = async (status) => {

    const res = await updateLostPersonReport(person.id,status)

    const updatedReports = lostReports.map((p) =>
      p.name === person.name ? { ...p, status } : p
    );
    setLostReports(updatedReports);
  };

  const openConfirmModal = (action) => {
    setCurrentAction(action);
    setIsModalOpen(true);
  };

  const confirmAction = () => {
    if (currentAction) {
      updateReportStatus(currentAction);
    }
    setIsModalOpen(false); 
  };

  const getCardBg = (status) => {
    const statusMap = {
      detected: 'bg-green-200',
      lost: 'bg-red-200',
      found: 'white',
    };
    return statusMap[status] || 'default-bg';
  };

  return (
    <>
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
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            onClick={() => openConfirmModal('found')}
            disabled={person.status === 'found'}
          >
            Mark as Found
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
            onClick={() => openConfirmModal('lost')}
            disabled={person.status === 'lost'}
          >
            Mark as Not Detected
          </button>

          <button
            className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300"
            onClick={() => openConfirmModal('detected')}
            disabled={person.status !== 'lost'}
          >
            Mark as Detected
          </button>
        </div>
      </div>
      
      {isModalOpen && (
        <ConfirmModal
          message={`Are you sure you want to mark ${person.name} as ${statusActions[currentAction]?.message}?`}
          onConfirm={confirmAction}
          onClose={() => setIsModalOpen(false)}
          confirmMessage={`Yes, Mark as ${statusActions[currentAction]?.message}`}
          confirmButtonColor={statusActions[currentAction]?.color}
        />
      )}
    </>
  );
};

export default ReportCard;
