import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";


export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [user, setUser] = useState(null);
    const [auth, setAuth] = useState(null); 
    const [loading,setLoading]=useState(true);


    useEffect(() => {
        const savedAuth = localStorage.getItem("auth");
        const savedUser = localStorage.getItem("user");

        if (savedUser) setUser(JSON.parse(savedUser));
        if (savedAuth) setAuth(JSON.parse(savedAuth));

        setLoading(false);
    }, []);

    useEffect(() => {
        if (auth) localStorage.setItem("auth", JSON.stringify(auth));
        else localStorage.removeItem("auth");
    }, [auth]);

    useEffect(() => {
        if (user) localStorage.setItem("user", JSON.stringify(user));
        else localStorage.removeItem("user");
    }, [user]);


    const updateAccessToken=(newToken)=>{
        setAuth(prev=>{
            if(!prev) return prev;
            return {
                ...prev,
                token:newToken
            }
        });
    }

    const logout=()=>{
        setUser(null);
        setAuth(null);
        localStorage.removeItem("auth");
        localStorage.removeItem("user");
        window.location.replace("/auth");
    }

    const login=({ token, refreshToken, userId })=>{
        setAuth({ token, refreshToken, userId });
    }

    return(
        <AuthContext.Provider value={{
        auth,
        user,
        setUser,
        login,
        logout,
        updateAccessToken,
        loading
        }}>
            {children}
        </AuthContext.Provider>
    );
}