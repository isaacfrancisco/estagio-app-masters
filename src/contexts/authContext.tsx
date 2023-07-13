import { User, onAuthStateChanged } from 'firebase/auth';
import { createContext, useState } from 'react';
import { auth } from '~/database/config/firebaseConfig';
import { signInUser } from '~/database/services/firebaseService';

interface IAuthProvider {
  children: React.ReactNode;
}
interface IHandleSignInProps {
  email: string;
  password: string;
  onSuccess: () => void;
}

interface IAuthContextData {
  user: any;
  getUser: any;
  handleSignIn: (props: IHandleSignInProps) => void;
}

export const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthContextProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState({} as any);

  const getUser = () => {
    if (Object.keys(user).length === 0) {
      onAuthStateChanged(auth, (user: User | null) => {
        if (user) {
          setUser({ user_uid: user.uid, user_email: user.email });
        }
      });
    }
  };

  const handleSignIn = ({ email, password, onSuccess }: IHandleSignInProps) => {
    signInUser({ email, password })
      .then((userCredential) => {
        const userData = userCredential.user;
        setUser({ user_uid: userData.uid, user_email: userData.email });
        onSuccess();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('errorCode', errorCode);
        console.error('errorMessage', errorMessage);
      });
  };

  return (
    <AuthContext.Provider value={{ user, getUser, handleSignIn }}>{children}</AuthContext.Provider>
  );
};
