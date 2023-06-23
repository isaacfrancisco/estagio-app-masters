import { useEffect, useState } from 'react';
import './styles.css';
import ErrorContainer from '../ErrorContainer';
import Loader from '../Loader';

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
  const [errorStatusCode, setErrorStatusCode] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://games-test-api-81e9fb0d564a.herokuapp.com/api/data', {
          headers: {
            'dev-email-address': 'isaacfrancisco14@gmail.com',
          },
        });
        if (!response.ok) {
          setErrorStatusCode(response.status);
          throw new Error('Server error');
        }
        const data = await response.json();
        console.log(data);
        setGames(data);
        setLoading(false);
      } catch (error) {
        setHasError(true);
      }
    };
    fetchData();
  }, []);

  if (hasError) {
    return <ErrorContainer statusCode={errorStatusCode} />;
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className='main'>
          <ul className='cards'>
            {games?.map((game: GameProps) => {
              return (
                <li key={game.id} className='cards_item'>
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
