import { ChangeEvent, useEffect, useState } from 'react';
import './Home.css';
import ErrorContainer from '../../components/ErrorContainer/ErrorContainer';
import Loader from '../../components/Loader/Loader';
import SearchInput from '../../components/SearchInput/SearchInput';
import DropdownFilter from '../../components/DropdownFilter/DropdownFilter';
import { GameProps } from '~/interfaces/HomeProps';
import GameCard from '~/components/GameCard/GameCard';
import Header from '~/components/Header';
import FavoriteButtonFilter from '~/components/FavoriteButtonFilter';
import { getAllFavoriteGamesAction } from '~/database/services/actions/favoriteGamesAction';
import { IFavoriteGame } from '~/database/interfaces/favoriteGamesInterface';
import { Box, Container, Grid, SelectChangeEvent } from '@mui/material';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '~/database/config/firebaseConfig';
import { useAuth } from '~/contexts/hooks/useAuth';
import SortRatingButton from '~/components/SortRatingButton';

const Home = () => {
  const [games, setGames] = useState<GameProps[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [genreSelected, setGenreSelected] = useState<string>('');
  const [gamesGenre, setGamesGenre] = useState<string[]>([]);
  const [filteredGames, setFilteredGames] = useState<GameProps[]>([]);
  const [userFavoriteGames, setUserFavoriteGames] = useState<IFavoriteGame[]>([]);

  const { user, setUser } = useAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser({ user_uid: user.uid, user_email: user.email });
      }
    });
  }, [setUser]);

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
    const fetchUserFavoriteGames = async () => {
      try {
        const result = await getAllFavoriteGamesAction(user.user_email);
        setUserFavoriteGames(result as IFavoriteGame[]);
      } catch (error: any) {
        console.log(error);
      }
    };

    if (user?.user_email) {
      fetchUserFavoriteGames();
    }
  }, [user?.user_email]);

  const updatedGamesWithFavorites = filteredGames.map((game) => {
    const favoriteGameInList = userFavoriteGames.find(
      (favoriteGame) => favoriteGame.game_title === game.title,
    );
    if (favoriteGameInList) {
      game.is_favorite = true;
      game.doc_id = favoriteGameInList.doc_id;
      game.rating = favoriteGameInList.rating;
      return game;
    }
    game.rating = 0;
    return game;
  });

  console.log('updated games', updatedGamesWithFavorites);

  const favoriteGamesList = updatedGamesWithFavorites.filter((game) => game.is_favorite);
  const favoriteGenresList = Array.from(new Set(favoriteGamesList.map((game) => game.genre)));

  useEffect(() => {
    const genres = Array.from(new Set(games.map((game) => game.genre)));
    setGamesGenre(genres);

    const filtered =
      genreSelected.length > 0
        ? games.filter((game) => game.genre.toLowerCase() === genreSelected.toLowerCase())
        : games.filter((game) => game.title.toLowerCase().startsWith(search.toLowerCase()));
    setFilteredGames(filtered);
  }, [games, genreSelected, search]);

  const handleFilterFavorites = (e: any) => {
    setFilteredGames(favoriteGamesList);
    setGamesGenre(favoriteGenresList);
    setGames(favoriteGamesList);
  };

  const handleSortGames = (e: any) => {
    console.log('');
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
                gamesGenre={gamesGenre}
                genreSelected={genreSelected}
                handleDropdownChange={handleDropdownChange}
              />
            </Box>
            <Container sx={{ py: 8 }} maxWidth='md'>
              <Grid container spacing={4}>
                {updatedGamesWithFavorites.splice(0, 60)?.map((game: GameProps, index: number) => {
                  return (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                      <GameCard
                        doc_id={game.doc_id}
                        id={game.id}
                        description={game.short_description}
                        image={game.thumbnail}
                        title={game.title}
                        is_favorite={game.is_favorite}
                        rating={game.rating ?? 0}
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
