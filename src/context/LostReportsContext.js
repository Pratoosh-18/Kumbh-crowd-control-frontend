import React, { createContext, useState, useContext } from 'react';

const LostReportsContext = createContext();

export const LostReportsProvider = ({ children }) => {
    const [lostReports, setLostReports] = useState([]);

    const values = {
        lostReports, setLostReports
    };

    return (
        <LostReportsContext.Provider value={values}>
            {children}
        </LostReportsContext.Provider>
    );
};

export const useLostReports = () => {
    return useContext(LostReportsContext);
};
