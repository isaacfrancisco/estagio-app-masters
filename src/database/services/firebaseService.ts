import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

export const createUser = async ({ email, password }: { email: string; password: string }) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUser = async ({ email, password }: { email: string; password: string }) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => {
  signOut(auth)
    .then(() => {
      console.log('Sign-out successful.');
    })
    .catch((error) => {
      throw error;
    });
};

export const getCurrentUser = () => {
  onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      const currentUser = { uid: user.uid, email: user.email };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  });
};
