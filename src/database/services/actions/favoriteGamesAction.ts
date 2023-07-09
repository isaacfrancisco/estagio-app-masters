import { IFavoriteGame } from '~/database/interfaces/favoriteGamesInterface';
import { addFavoriteGameAccess } from '../dataAccess/favoriteGamesAccess';

export async function addFavoriteGameAction(data: IFavoriteGame) {
  return await addFavoriteGameAccess(data);
}
