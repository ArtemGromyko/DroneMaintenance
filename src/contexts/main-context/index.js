import React, { useEffect, useState } from 'react';

const MainContext = React.createContext();

function MainContextProvider({ children }) {
    const [user, setUser] = useState();

    return (
        <MainContext.Provider value={{ user, setUser }}>
            {children}
        </MainContext.Provider>
    );
}

export { MainContextProvider, MainContext };