import React, { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";

const ContextWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
            <AuthProvider>{children}</AuthProvider>
        </>
    );
};

export default ContextWrapper;
