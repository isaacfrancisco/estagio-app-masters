import { ChangeEvent, useEffect, useState } from 'react';
import './Home.css';
import ErrorContainer from '../../components/ErrorContainer/ErrorContainer';
import Loader from '../../components/Loader/Loader';
import SearchInput from '../../components/SearchInput/SearchInput';
import DropdownFilter from '../../components/DropdownFilter/DropdownFilter';
import { GameProps, GamePropsList } from '~/interfaces/HomeProps';
import GameCard from '~/components/GameCard/GameCard';
import Header from '~/components/Header';
import FavoriteButtonFilter from '~/components/FavoriteButtonFilter';
import { Box, Container, Grid, SelectChangeEvent } from '@mui/material';
import { useAuth } from '~/contexts/hooks/useAuth';
import SortRatingButton from '~/components/SortRatingButton';
import { useFavorite } from '~/contexts/hooks/useFavorite';
import { IFavoriteGame } from '~/database/interfaces/favoriteGamesInterface';

const Home = () => {
  const [games, setGames] = useState<GameProps[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [genreSelected, setGenreSelected] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isSort, setIsSort] = useState<boolean>(false);

  const { user, getUser } = useAuth();
  const { favoriteGames, fetchUserFavoriteGames } = useFavorite();

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    const fetchData = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), import.meta.env.VITE_REQUEST_TIMEOUT);
      const responseErrors = [500, 502, 503, 504, 507, 508, 509];

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/data`, {
          headers: {
            'dev-email-address': import.meta.env.VITE_API_EMAIL,
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          setErrorMessage(
            responseErrors.includes(response.status)
              ? 'O servidor falhou em responder, tente recarregar a página'
              : 'O servidor não conseguirá responder por agora, tente voltar novamente mais tarde',
          );
          throw new Error('Server error');
        }

        const data = await response.json();
        setGames(data);
        setLoading(false);
      } catch (error: any) {
        if (error.name === 'AbortError') {
          setErrorMessage('O servidor demorou para responder, tente mais tarde');
        }
        setHasError(true);
      } finally {
        clearTimeout(timeoutId);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserFavoriteGames('test@test.com');
    }
  }, [fetchUserFavoriteGames, user]);

  const filteredGames = () => {
    const updatedGamesWithFavorites: GamePropsList[] = games.map((game) => {
      const favoriteGameInList = favoriteGames?.find(
        (favoriteGame: IFavoriteGame) => favoriteGame.game_title === game.title,
      );
      if (favoriteGameInList) {
        return { ...favoriteGameInList, ...game, is_favorite: true };
      }
      game.rating = 0;
      return game;
    });

    if (isFavorite) {
      const favoriteGamesList: GamePropsList[] = updatedGamesWithFavorites.filter(
        (game) => game.is_favorite,
      );
      return favoriteGamesList;
    }

    if (isSort) {
      const sortedGamesList = updatedGamesWithFavorites.sort(
        (a: any, b: any) => a.rating - b.rating,
      );
      return sortedGamesList;
    }

    return updatedGamesWithFavorites;
  };

  console.log('filteredGames', filteredGames());

  const genres = isFavorite
    ? Array.from(new Set(filteredGames().map((game) => game.genre)))
    : Array.from(new Set(games.map((game) => game.genre)));

  const handleFilterFavorites = () => {
    setIsFavorite(!isFavorite);
  };

  const handleSortGames = () => {
    setIsSort(!isSort);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleDropdownChange = (event: SelectChangeEvent) => {
    setGenreSelected(event.target.value);
  };

  if (hasError) {
    return <ErrorContainer message={errorMessage} />;
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className='main'>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 3 }}>
              <SearchInput search={search} handleSearchChange={handleSearchChange} />
              <FavoriteButtonFilter handleFilterFavorites={handleFilterFavorites} />
              <SortRatingButton handleSortGames={handleSortGames} />
              <DropdownFilter
                gamesGenre={genres}
                genreSelected={genreSelected}
                handleDropdownChange={handleDropdownChange}
              />
            </Box>
            <Container sx={{ py: 8 }} maxWidth='md'>
              <Grid container spacing={4}>
                {filteredGames()
                  .slice(0, 60)
                  .filter((item) => {
                    return search.toLowerCase() === ''
                      ? item
                      : item.title.toLowerCase().includes(search);
                  })
                  ?.map((game: GamePropsList, index: number) => {
                    return (
                      <Grid item key={index} xs={12} sm={6} md={4}>
                        <GameCard
                          doc_id={game.doc_id}
                          id={game.id}
                          description={game.short_description}
                          image={game.thumbnail}
                          title={game.title}
                          is_favorite={game.is_favorite}
                          rating={game.rating}
                        />
                      </Grid>
                    );
                  })}
              </Grid>
            </Container>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
