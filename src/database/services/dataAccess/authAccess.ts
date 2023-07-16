import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';

export const createUserAccess = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserAccess = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUserAccess = () => {
  signOut(auth)
    .then()
    .catch((error) => {
      throw error;
    });
};
