import { IFavoriteGame } from '~/database/interfaces/favoriteGamesInterface';
import {
  addFavoriteGameAccess,
  deleteFavoriteGameAccess,
  getAllFavoriteGamesAccess,
  setFavoriteGameAccess,
} from '../dataAccess/favoriteGamesAccess';
import { DocumentData } from 'firebase/firestore';

export async function getAllFavoriteGamesAction(userUid: string) {
  const games: DocumentData[] = [];

  const result = await getAllFavoriteGamesAccess(userUid);
  result.forEach((doc) => {
    games.push({ ...doc.data(), doc_id: doc.id });
  });

  return games;
}

export async function addFavoriteGameAction(data: IFavoriteGame) {
  return await addFavoriteGameAccess(data);
}

export async function setFavoriteGameAction(data: IFavoriteGame) {
  return await setFavoriteGameAccess(data);
}

export async function deleteFavoriteGameAction(docId: string) {
  return await deleteFavoriteGameAccess(docId);
}
