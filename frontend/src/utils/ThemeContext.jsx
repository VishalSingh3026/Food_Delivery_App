import { createContext, useState } from "react";

export const ThemeContext = createContext({
    darkMode: true,
    toggleDarkMode: () => { }
})

export const ThemeContextProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true);

    const toggleDarkMode = (prev) => {
        setDarkMode(!prev);
    }

    return <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
        {children}
    </ThemeContext.Provider>
}