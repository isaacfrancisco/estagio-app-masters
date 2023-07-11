import { createContext, useState } from 'react';

interface IAuthProvider {
  children: React.ReactNode;
}

interface IAuthContextData {
  user: any;
  setUser: any;
}

export const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthContextProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState();

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
