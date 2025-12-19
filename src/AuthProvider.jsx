import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";


export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [user, setUser] = useState(null);
    const [loading,setLoading]=useState(true);


    useEffect(()=>{
        const saved = localStorage.getItem("user");
        if(saved){
            setUser(JSON.parse(saved));
        }
        setLoading(false);

    },[]);

    useEffect(()=>{

        if(user){
            localStorage.setItem("user",JSON.stringify(user));
        }

    },[user]);

    return(
        <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    );
}