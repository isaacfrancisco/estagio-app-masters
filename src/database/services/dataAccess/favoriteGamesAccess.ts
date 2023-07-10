import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '~/database/config/firebaseConfig';
import { IFavoriteGame } from '~/database/interfaces/favoriteGamesInterface';

export async function getAllFavoriteGamesAccess(userEmail: string) {
  const q = query(collection(db, 'favorite-games'), where('user_email', '==', userEmail));

  return await getDocs(q);
}

export async function addFavoriteGameAccess(data: IFavoriteGame) {
  return await addDoc(collection(db, 'favorite-games'), data);
}
