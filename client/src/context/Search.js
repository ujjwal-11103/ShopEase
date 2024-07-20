import React, { useState, useContext, createContext } from 'react';

// Create the context
const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        keyword: "",
        result: [],
    });

    return (
        <SearchContext.Provider value={[auth, setAuth]}>
            {children}
        </SearchContext.Provider>
    );
};

// Custom hook to use the SearchContext
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
