import { ChangeEvent, useEffect, useState } from 'react';
import '../DropdownFilter/styles.css';
import './styles.css';
import ErrorContainer from '../ErrorContainer';
import Loader from '../Loader';
import SearchInput from '../SearchInput';

interface GameProps {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

const Main = () => {
  const [games, setGames] = useState<GameProps[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [genreSelected, setGenreSelected] = useState('');

  const filteredGames =
    genreSelected.length > 0
      ? games.filter((game) => {
          return game.genre.toLowerCase() === genreSelected.toLowerCase();
        })
      : games.filter((game) => {
          return game.title.toLowerCase().startsWith(search.toLowerCase());
        });

  const gamesGenre = Array.from(new Set(games.map((game) => game.genre)));

  useEffect(() => {
    const fetchData = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const responseErrors = [500, 502, 503, 504, 507, 508, 509];

      try {
        const response = await fetch('https://games-test-api-81e9fb0d564a.herokuapp.com/api/data', {
          headers: {
            'dev-email-address': 'isaacfrancisco14@gmail.com',
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
        console.log(data);
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
        <div className='main'>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SearchInput search={search} handleSearchChange={handleSearchChange} />
            <select className='select-box' value={genreSelected} onChange={handleDropdownChange}>
              <option value=''>Selecione uma opção</option>
              {gamesGenre.map((genre, index) => {
                return (
                  <option value={genre} key={index}>
                    {genre}
                  </option>
                );
              })}
            </select>
          </div>
          <ul className='cards'>
            {filteredGames?.map((game: GameProps, index: number) => {
              return (
                <li key={index} className='cards_item'>
                  <div className='card'>
                    <img src={game.thumbnail} alt='' />
                    <div className='card_content'>
                      <h2 className='card_title'>{game.title}</h2>
                      <p className='card_text'>{game.short_description}</p>
                    </div>
                    <button className='btn card_btn'>Saiba mais</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Main;
