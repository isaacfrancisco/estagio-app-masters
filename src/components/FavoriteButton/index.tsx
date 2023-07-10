import { MouseEvent } from 'react';
import './styles.css';

const FavoriteButton = ({
  handleFilterFavorites,
}: {
  handleFilterFavorites: (event: MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <button onClick={handleFilterFavorites} className='favorite-button'>
      Favoritos
    </button>
  );
};

export default FavoriteButton;
