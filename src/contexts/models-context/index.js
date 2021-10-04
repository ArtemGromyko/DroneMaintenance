import React, { useState } from 'react';

const modelContext = React.createContext();

function ModelContextProvider({ children }) {
    const [model, setModel] = useState();

    return (
        <modelContext.Provider value={{model, setModel}}>
            {children}
        </modelContext.Provider>
    );
}

export {modelContext, ModelContextProvider};