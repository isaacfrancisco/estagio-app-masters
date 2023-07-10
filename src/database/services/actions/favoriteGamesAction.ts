import { IFavoriteGame } from '~/database/interfaces/favoriteGamesInterface';
import {
  addFavoriteGameAccess,
  getAllFavoriteGamesAccess,
} from '../dataAccess/favoriteGamesAccess';
import { DocumentData } from 'firebase/firestore';

export async function getAllFavoriteGamesAction(userEmail: string) {
  const games: DocumentData[] = [];

  const result = await getAllFavoriteGamesAccess(userEmail);
  result.forEach((doc) => {
    games.push(doc.data());
  });

  return games;
}

export async function addFavoriteGameAction(data: IFavoriteGame) {
  return await addFavoriteGameAccess(data);
}
