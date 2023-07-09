/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { CardProps } from '~/interfaces/CardProps';
import HeartIcon from '../../assets/heart.svg';
import './Card.css';
import { addFavoriteGameAction } from '~/database/services/actions/favoriteGamesAction';
import { ICurrentUser } from '~/database/interfaces/usersInterface';
import { useState } from 'react';

const Card = ({ id, image, title, description }: CardProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { uid, email }: ICurrentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  const handleAddFavoriteGame = () => {
    addFavoriteGameAction({
      game_id: id,
      game_title: title,
      user_email: email,
      user_uid: uid,
    })
      .then(() => {
        setIsFavorite(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className='card'>
      <img className='game-image' src={image} alt='' />
      <div className='card-content'>
        <h2 className='card-title'>{title}</h2>
        <p className='card-text'>{description}</p>
        <div className='heart-icon-box'>
          <img
            className={isFavorite ? 'heart-active' : 'heart'}
            onClick={handleAddFavoriteGame}
            src={HeartIcon}
            alt=''
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
