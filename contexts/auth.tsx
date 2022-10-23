import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IUser from "../models/IUser";

interface AuthContextData {
    signed: boolean;
    user: IUser | undefined;
    signIn(usuario: IUser): Promise<void>;
    signOut(): void;
    signOutClearUser(): void;
    signOutClearAll(): void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) =>{
    const [user, setUser] = useState<IUser | undefined >(undefined);
    const [loading, setLoading] = useState(true);
    const [signedUser, setSignedUser] = useState(false)
 

    useEffect(()=>{
        async  function loadStorageData(){
            const storageUser = await AsyncStorage.getItem('@Usuario:user')

            if(storageUser){
             setUser(JSON.parse(storageUser));
             setLoading(false)
             setSignedUser(true)
            }
        }
        loadStorageData();

    },[]);


    async function signIn(usuario: IUser){
        setUser(usuario)
        setSignedUser(true)
        await AsyncStorage.setItem('@Usuario:user', JSON.stringify(usuario))
        
        return Promise.resolve()
    }

    //Mantém o usuário setado e encerra a sessão.
    function signOut(){
        setSignedUser(false)   
        
    }

    //Remove o usuário setado e encerra a sessão.
    async function signOutClearAll(){
          await AsyncStorage.clear().then(()=>{
            setSignedUser(false)
          })    
    }

    //Remove o usuário setado e encerra a sessão.
    async function signOutClearUser(){
        const keys= [ "@Usuario:user"]
        await AsyncStorage.multiRemove(keys).then(()=>{
          setSignedUser(false)
        })    
    }


    return (
        <AuthContext.Provider 
            value={{
                signed: signedUser, 
                user,  
                signIn, 
                signOut, 
                signOutClearAll, 
                signOutClearUser
            }}
        >    
          {children}
        </AuthContext.Provider>
    );

}

export default AuthContext;
