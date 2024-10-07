import React, { createContext, useState } from 'react';

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);

  const addActivity = (activity) => {
    setActivities((prevActivities) => [...prevActivities, activity]);
  };

  return (
    <ActivityContext.Provider value={{ activities, addActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};
