import { createContext, useState } from 'react';
import { getAllFavoriteGamesAction } from '~/database/services/actions/favoriteGamesAction';
import { IFavoriteGame } from '~/database/interfaces/favoriteGamesInterface';

interface IFavoriteProvider {
  children: React.ReactNode;
}

interface IFavoriteContextData {
  favoriteGames: any;
  fetchUserFavoriteGames: (userUid: string) => void;
}

export const FavoriteContext = createContext<IFavoriteContextData>({} as IFavoriteContextData);

export const FavoriteContextProvider = ({ children }: IFavoriteProvider) => {
  const [favoriteGames, setFavoriteGames] = useState<IFavoriteGame[]>([]);

  const fetchUserFavoriteGames = async (userUid: string) => {
    try {
      if (userUid) {
        const result = await getAllFavoriteGamesAction(userUid);
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
