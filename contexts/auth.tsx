import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IUser from "../models/IUser";

interface AuthContextData {
  signed: boolean;
  error: string;
  showError: boolean;
  user: IUser | undefined;
  signIn(usuario: IUser): Promise<void>;
  signOut(): void;
  signOutClearUser(): void;
  signOutClearAll(): void;
  showMessage(message: string): void;
  hideMessage(): void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [error, setError] = useState("");
  const [showError, setshowError] = useState(false);
  const [signedUser, setSignedUser] = useState(false);
  const [user, setUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem("@Usuario:user");

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setSignedUser(true);
      }
    }
    loadStorageData();
  }, []);

  async function signIn(usuario: IUser) {
    setUser(usuario);
    setSignedUser(true);
    await AsyncStorage.setItem("@Usuario:user", JSON.stringify(usuario));

    return Promise.resolve();
  }

  //Mantém o usuário setado e encerra a sessão.
  function signOut() {
    setSignedUser(false);
  }

  //Remove o usuário setado e encerra a sessão.
  async function signOutClearAll() {
    await AsyncStorage.clear().then(() => {
      setSignedUser(false);
    });
  }

  //Remove o usuário setado e encerra a sessão.
  async function signOutClearUser() {
    const keys = ["@Usuario:user"];
    await AsyncStorage.multiRemove(keys).then(() => {
      setSignedUser(false);
    });
  }

  function showMessage(message: string) {
    setError(message);
    setshowError(true);

    setTimeout(() => {
      setError("");
      setshowError(false);
    }, 5000);
  }

  function hideMessage() {
    setError("");
    setshowError(false);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: signedUser,
        showError,
        error,
        user,
        signIn,
        signOut,
        signOutClearAll,
        signOutClearUser,
        showMessage,
        hideMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
