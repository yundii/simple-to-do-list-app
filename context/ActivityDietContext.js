import React, { createContext, useState } from 'react';

export const ActivityDietContext = createContext();

export const ActivityDietProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [dietEntries, setDietEntries] = useState([]);

  const addActivity = (activity) => {
    setActivities((prevActivities) => [...prevActivities, activity]);
  };

  const addDietEntry = (newEntry) => {
    setDietEntries((prevEntries) => [...prevEntries, newEntry]);
  };

  return (
    <ActivityDietContext.Provider value={{ activities, addActivity, dietEntries, addDietEntry }}>
      {children}
    </ActivityDietContext.Provider>
  );
};

