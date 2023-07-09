import { ChangeEvent, useEffect, useState } from 'react';
import './Home.css';
import ErrorContainer from '../../components/ErrorContainer/ErrorContainer';
import Loader from '../../components/Loader/Loader';
import SearchInput from '../../components/SearchInput/SearchInput';
import Pagination from '../../components/Pagination/Pagination';
import DropdownFilter from '../../components/DropdownFilter/DropdownFilter';
import { GameProps } from '~/interfaces/HomeProps';
import List from '~/components/List/List';
import ListItem from '~/components/ListItem/ListItem';
import Card from '~/components/Card/Card';
import Header from '~/components/Header';

const Home = () => {
  const [games, setGames] = useState<GameProps[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [genreSelected, setGenreSelected] = useState<string>('');

  const [currentPage, setCurrentPage] = useState<number>(1);
  const gamesPerPage = 6;

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  console.log('currentUser', currentUser);

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

  const filteredGames =
    genreSelected.length > 0
      ? games.filter((game) => {
          return game.genre.toLowerCase() === genreSelected.toLowerCase();
        })
      : games.filter((game) => {
          return game.title.toLowerCase().startsWith(search.toLowerCase());
        });

  const gamesGenre = Array.from(new Set(games.map((game) => game.genre)));

  const lastGameIndex = currentPage * gamesPerPage;
  const firstGameIndex = lastGameIndex - gamesPerPage;
  const currentGames = filteredGames.slice(firstGameIndex, lastGameIndex);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
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
            <div className='filter-container'>
              <SearchInput search={search} handleSearchChange={handleSearchChange} />
              <DropdownFilter
                gamesGenre={gamesGenre}
                genreSelected={genreSelected}
                handleDropdownChange={handleDropdownChange}
              />
            </div>
            <List>
              {currentGames?.map((game: GameProps, index: number) => {
                return (
                  <ListItem key={index}>
                    <Card
                      id={game.id}
                      description={game.short_description}
                      image={game.thumbnail}
                      title={game.title}
                    />
                  </ListItem>
                );
              })}
            </List>
            <Pagination
              gamesPerPage={gamesPerPage}
              totalGames={filteredGames.length}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
