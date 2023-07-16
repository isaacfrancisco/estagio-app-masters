import { addDoc, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '~/database/config/firebaseConfig';
import { IFavoriteGame } from '~/database/interfaces/favoriteGamesInterface';
import { generatePushID } from '~/database/utils/docIdGenerator';

export async function getAllFavoriteGamesAccess(userUid: string) {
  const q = query(collection(db, 'favorite-games'), where('user_uid', '==', userUid));

  return await getDocs(q);
}

export async function addFavoriteGameAccess(data: IFavoriteGame) {
  return await addDoc(collection(db, 'favorite-games'), data);
}

export async function setFavoriteGameAccess({
  doc_id,
  user_uid,
  game_id,
  rating,
  is_favorite,
}: IFavoriteGame) {
  const documentRef = doc(db, 'favorite-games', doc_id ?? `${generatePushID()()}`);
  return await setDoc(
    documentRef,
    {
      user_uid,
      game_id,
      rating,
      is_favorite,
    },
    { merge: true },
  );
}
