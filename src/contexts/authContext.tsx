import { User, onAuthStateChanged } from 'firebase/auth';
import { createContext, useState } from 'react';
import { auth } from '~/database/config/firebaseConfig';
import { createUserAction, signInUserAction } from '~/database/services/actions/authAction';

interface IAuthProvider {
  children: React.ReactNode;
}
interface IHandleAuthProps {
  email: string;
  password: string;
  onSuccess: () => void;
  onError: () => void;
}
interface IUser {
  user_uid: string;
}
interface IAuthContextData {
  user: IUser;
  getUser: any;
  handleSignIn: (props: IHandleAuthProps) => void;
  handleCreateUser: (props: IHandleAuthProps) => void;
  errorMessage: string;
}

export const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthContextProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState({} as any);
  const [errorMessage, setErrorMessage] = useState('');

  const getUser = () => {
    if (Object.keys(user).length === 0) {
      onAuthStateChanged(auth, (user: User | null) => {
        if (user) {
          setUser({ user_uid: user.uid });
        }
      });
    }
  };

  const handleSignIn = ({ email, password, onSuccess, onError }: IHandleAuthProps) => {
    signInUserAction({ email, password })
      .then((userCredential) => {
        const userData = userCredential.user;
        setUser({ user_uid: userData.uid });
        onSuccess();
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrorMessage(errorCode);
        onError();
      });
  };

  const handleCreateUser = ({ email, password, onSuccess, onError }: IHandleAuthProps) => {
    createUserAction({ email, password })
      .then(() => {
        onSuccess();
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrorMessage(errorCode);
        onError();
      });
  };

  return (
    <AuthContext.Provider value={{ user, getUser, handleSignIn, handleCreateUser, errorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};
