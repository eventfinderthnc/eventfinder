// just for user mock navbar and footer testing
"use client";
import { createContext, useContext } from "react";
const AuthContext = createContext({
    // make change here
    isLoggedIn: false,
    isOrg: true,
})

export const AuthProvider = ({ children } : {children: React.ReactNode}) => {
    const mockAuth = {
        isLoggedIn: true,
        isOrg: false,
    }
    return <AuthContext.Provider value={mockAuth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);