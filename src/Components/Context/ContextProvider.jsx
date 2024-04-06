// ContextProvider.jsx
import React, { createContext, useState, useContext } from 'react';

const Context = createContext();

const ContextProvider = ({ children }) => {
    const [matches, setMatches] = useState([]);
    const [TeamdetailsAll,SetTeamdetailsAll ] = useState([])
    const [drmBaseUrl, setDrmBaseUrl] = useState('');

   


  

  return (
    <Context.Provider
      value={{
        matches,
         setMatches,
         TeamdetailsAll,
         SetTeamdetailsAll,
         drmBaseUrl, setDrmBaseUrl
    
 
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useAppContext must be used within a ContextProvider');
  }
  return context;
};

export { Context, ContextProvider, useAppContext };
