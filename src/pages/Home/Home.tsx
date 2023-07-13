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
import { Container, Grid, SelectChangeEvent } from '@mui/material';
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

  const favoriteGamesReduced = favoriteGames?.reduce(
    (prev: any, current: any) => ({ ...prev, [current.game_id]: { ...current } }),
    {},
  );

  const favoriteGamesIds = favoriteGames?.map((item: IFavoriteGame) => item.game_id);

  const filteredGames = () => {
    if (isFavorite) {
      const favoriteGamesList: GameProps[] = games.filter((game) =>
        favoriteGamesIds.includes(game.id),
      );
      return favoriteGamesList;
    }

    // preciso arrumar
    if (isSort) {
      const sortedGamesList = games.sort((a: any, b: any) => a.rating - b.rating);
      return sortedGamesList;
    }

    return games;
  };

  const genres = isFavorite
    ? Array.from(new Set(filteredGames().map((game) => game.genre)))
    : Array.from(new Set(games.map((game) => game.genre)));

  const handleFilterFavorites = () => {
    setIsFavorite(!isFavorite);
  };

  const handleSortGames = () => {
    console.log('srot games', !isSort);
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

  const filteredGamesList = filteredGames()
    .filter((item) => {
      return search.toLowerCase() === '' ? item : item.title.toLowerCase().includes(search);
    })
    .filter((value) => {
      return genreSelected.length > 0
        ? value.genre.toLowerCase() === genreSelected.toLowerCase()
        : value;
    });

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className='main'>
            <Grid
              container
              direction={{ xs: 'column', sm: 'row', md: 'row' }}
              spacing={{ xs: 2, md: 3 }}
              paddingTop={{ xs: 2, sm: 5, md: 5 }}
              paddingLeft={{ xs: 2, sm: 3, md: 5 }}
              paddingRight={{ xs: 2, sm: 3, md: 5 }}
              marginTop={{ xs: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={2} sm={4} md={8}>
                <SearchInput search={search} handleSearchChange={handleSearchChange} />
              </Grid>
              <Grid item alignItems={'center'} xs={2} sm={4} md={4}>
                {' '}
                <DropdownFilter
                  gamesGenre={genres}
                  genreSelected={genreSelected}
                  handleDropdownChange={handleDropdownChange}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              marginLeft={{ xs: 0, sm: 1, md: 3 }}
              marginTop={{ xs: 3, sm: 3, md: 3 }}
            >
              <Grid item>
                <FavoriteButtonFilter handleFilterFavorites={handleFilterFavorites} />
              </Grid>
              <Grid item>
                <SortRatingButton handleSortGames={handleSortGames} />
              </Grid>
            </Grid>

            <Container sx={{ py: 8 }} maxWidth='md'>
              <Grid container spacing={4}>
                {filteredGamesList?.slice(0, 20).map((game: GameProps) => {
                  return (
                    <Grid item key={game.id} xs={12} sm={6} md={4}>
                      <GameCard
                        doc_id={game.doc_id}
                        id={game.id}
                        description={game.short_description}
                        image={game.thumbnail}
                        title={game.title}
                        is_favorite={favoriteGamesIds.includes(game.id)}
                        rating={favoriteGamesReduced[game.id]?.rating ?? 0}
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
