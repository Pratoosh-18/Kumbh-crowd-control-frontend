import React, { useState } from 'react';
import { useLostReports } from '../../../context/LostReportsContext';
import ConfirmModal from '../../Modal/ConfirmModal';
import { updateLostPersonReport } from '../../../helper/APICalls';

const statusActions = {
  found: { message: 'found', color: 'bg-green-500' },
  lost: { message: 'not detected', color: 'bg-red-500' },
  detected: { message: 'detected', color: 'bg-blue-500' },
};

const ReportCard = ({ person }) => {
  const { lostReports, setLostReports } = useLostReports();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);

  const updateReportStatus = async (status) => {
    const res = await updateLostPersonReport(person.id, status);
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
      detected: 'bg-blue-50',
      lost: 'bg-red-50',
      found: 'bg-green-50',
    };
    return statusMap[status] || 'bg-gray-100';
  };

  return (
    <>
      <div className={`flex flex-col lg:flex-row items-center p-6 rounded-lg shadow-lg ${getCardBg(person.status)} transition duration-300 ease-in-out hover:shadow-xl`}>
        <div className="flex-shrink-0 mb-4 lg:mb-0">
          <img
            src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`}
            alt={person.name}
            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-md"
          />
        </div>
        <div className="flex-1 text-center lg:text-left lg:ml-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{person.name}</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-medium">Age:</span> {person.age}</p>
            <p><span className="font-medium">Gender:</span> {person.gender}</p>
            <p><span className="font-medium">Last Seen:</span> {person.lastSeen}</p>
            <p><span className="font-medium">Parent:</span> {person.parentName}</p>
            <p><span className="font-medium">Phone:</span> {person.phone}</p>
            <p><span className="font-medium">Email:</span> {person.mail}</p>
            <p><span className="font-medium">Status:</span> {person.status}</p>
          </div>
        </div>
        <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col sm:flex-row gap-2 space-x-2">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={() => openConfirmModal('found')}
            disabled={person.status === 'found'}
          >
            Mark as Found
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={() => openConfirmModal('lost')}
            disabled={person.status === 'lost'}
          >
            Mark as Not Detected
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
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
