import { addDoc, collection } from 'firebase/firestore';
import { db } from '~/database/config/firebaseConfig';
import { IFavoriteGame } from '~/database/interfaces/favoriteGamesInterface';

export async function addFavoriteGameAccess(data: IFavoriteGame) {
  return await addDoc(collection(db, 'favorite-games'), data);
}
