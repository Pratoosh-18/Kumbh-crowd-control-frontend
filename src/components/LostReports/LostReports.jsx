import React, { useEffect } from 'react';
import { LoastBache } from '../../Constants/LostBache';
import ReportCard from './components/ReportCard';
import { useLostReports } from '../../context/LostReportsContext';

const LostReports = () => {
    const { lostReports, setLostReports } = useLostReports();

    useEffect(() => {

        // API call will go here to load and set the Lost bachas data initially
      setLostReports(LoastBache);
    }, [setLostReports]);
    
    const lostOrDetected = (Array.isArray(lostReports) ? lostReports : [])
      .filter(person => person.status === 'lost' || person.status === 'detected')
      .sort((a, b) => a.status === 'detected' ? -1 : 1);

    const foundPeople = (Array.isArray(lostReports) ? lostReports : [])
      .filter(person => person.status === 'found');

    return (
      <div className="p-4 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Lost or Detected People</h2>
          <div className="space-y-4">
            {lostOrDetected.map((person, index) => (
              <ReportCard key={index} person={person} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Found People</h2>
          <div className="space-y-4">
            {foundPeople.map((person, index) => (
              <ReportCard key={index} person={person} />
            ))}
          </div>
        </div>
      </div>
    );
};

export default LostReports;
