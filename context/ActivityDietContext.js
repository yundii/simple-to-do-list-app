import React, { createContext, useState } from 'react';

// Create the context
export const ActivityDietContext = createContext();
// Create the provider
export const ActivityDietProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [dietEntries, setDietEntries] = useState([]);
  // This function adds a new activity to the activities array
  const addActivity = (activity) => {
    setActivities((prevActivities) => [...prevActivities, activity]);
  };
// This function adds a new diet entry to the dietEntries array
  const addDietEntry = (newEntry) => {
    setDietEntries((prevEntries) => [...prevEntries, newEntry]);
  };

  const updateActivity = (updatedActivity) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) => (activity.id === updatedActivity.id ? updatedActivity : activity))
    );
  };
  
  const deleteActivity = (id) => {
    setActivities((prevActivities) => prevActivities.filter((activity) => activity.id !== id));
  };

  return (
    <ActivityDietContext.Provider value={{ activities, addActivity, updateActivity, deleteActivity, dietEntries, addDietEntry }}>
      {children}
    </ActivityDietContext.Provider>
  );
};

