import { createContext, useState } from 'react';
import { getAllFavoriteGamesAction } from '~/database/services/actions/favoriteGamesAction';
import { IFavoriteGame } from '~/database/interfaces/favoriteGamesInterface';

interface IFavoriteProvider {
  children: React.ReactNode;
}

interface IFavoriteContextData {
  favoriteGames: any;
  fetchUserFavoriteGames: (email: string) => void;
}

export const FavoriteContext = createContext<IFavoriteContextData>({} as IFavoriteContextData);

export const FavoriteContextProvider = ({ children }: IFavoriteProvider) => {
  const [favoriteGames, setFavoriteGames] = useState<IFavoriteGame[]>([]);

  const fetchUserFavoriteGames = async (email: string) => {
    try {
      if (email && !(favoriteGames.length > 0)) {
        const result = await getAllFavoriteGamesAction(email);
        setFavoriteGames(result as IFavoriteGame[]);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <FavoriteContext.Provider value={{ favoriteGames, fetchUserFavoriteGames }}>
      {children}
    </FavoriteContext.Provider>
  );
};
