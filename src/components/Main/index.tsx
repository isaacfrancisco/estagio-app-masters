import { useEffect, useState } from 'react';
import './styles.css';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://games-test-api-81e9fb0d564a.herokuapp.com/api/data', {
          headers: {
            'dev-email-address': 'isaacfrancisco14@gmail.com',
          },
        });
        console.log('Response', response);
        const data = await response.json();
        console.log(data);
        setGames(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className='main'>
        <h1>Lista de Jogos</h1>
        <ul className='cards'>
          {games?.slice(0, 6).map((game: GameProps) => {
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

      <h3 className='made_by'>Isaac Francisco</h3>
    </div>
  );
};

export default Main;
