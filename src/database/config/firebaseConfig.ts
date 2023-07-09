import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCeCSw1CRsvurNglipfh-04NJXNfcsGf6c',
  authDomain: 'test-app-masters.firebaseapp.com',
  projectId: 'test-app-masters',
  storageBucket: 'test-app-masters.appspot.com',
  messagingSenderId: '943744493296',
  appId: '1:943744493296:web:17d8fe40a4ad103dc80435',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
