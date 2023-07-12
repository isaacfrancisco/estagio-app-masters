import { useContext } from 'react';

import { FavoriteContext } from '../favoriteContext';

export const useFavorite = () => {
  return useContext(FavoriteContext);
};
