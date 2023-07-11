/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { CardProps } from '~/interfaces/CardProps';
import {
  addFavoriteGameAction,
  setFavoriteGameAction,
} from '~/database/services/actions/favoriteGamesAction';
import { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import { useAuth } from '~/contexts/hooks/useAuth';
import HeartIcon from '../../assets/heart.svg';
import './GameCard.css';

const GameCard = ({
  doc_id,
  id,
  image,
  title,
  description,
  is_favorite,
  rating: game_current_rating,
}: CardProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(game_current_rating);

  const { user } = useAuth();
  const changeButtonClass = isFavorite ? 'heart-active' : 'heart';

  const handleAddFavoriteGame = () => {
    addFavoriteGameAction({
      game_id: id,
      game_title: title,
      user_email: user.user_email,
      user_uid: user.user_uid,
    })
      .then(() => {
        setIsFavorite(true);
      })
      .catch((error) => console.log(error));
  };

  const handleUpdateFavoriteGame = (currentRating: any) => {
    setRating(currentRating);
    setFavoriteGameAction({
      game_id: id,
      game_title: title,
      user_email: user.user_email,
      user_uid: user.user_uid,
      doc_id,
      rating: currentRating,
    })
      .then(() => {
        setRating(currentRating);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component='div'
        sx={{
          pt: '56.25%',
        }}
        image={image}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant='h5' component='h2'>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </CardContent>
      <CardActions>
        <img
          className={is_favorite ? 'heart-active' : changeButtonClass}
          onClick={handleAddFavoriteGame}
          src={HeartIcon}
          alt=''
        />
        <Rating
          name='controlled'
          value={rating}
          onChange={(_, newValue) => handleUpdateFavoriteGame(newValue)}
        />
      </CardActions>
    </Card>
  );
};

export default GameCard;
