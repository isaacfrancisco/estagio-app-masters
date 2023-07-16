/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { CardProps } from '~/interfaces/CardProps';
import {
  addFavoriteGameAction,
  deleteFavoriteGameAction,
  setFavoriteGameAction,
} from '~/database/services/actions/favoriteGamesAction';
import { useState } from 'react';
import {
  AlertColor,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import { useAuth } from '~/contexts/hooks/useAuth';
import HeartIcon from '../../assets/heart.svg';
import './styles.css';
import SimpleSnackbar from '../SimpleSnackbar';
import { useFavorite } from '~/contexts/hooks/useFavorite';

const GameCard = ({
  doc_id,
  id,
  image,
  title,
  description,
  is_favorite,
  rating: game_current_rating,
}: CardProps) => {
  const [isFavoriteClicked, setIsFavoriteClicked] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(game_current_rating);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor | undefined>('info');

  const { user } = useAuth();
  const { fetchUserFavoriteGames } = useFavorite();

  const userExists = Object.keys(user).length > 0;
  const changeButtonClass = isFavoriteClicked ? 'heart-active heart-clicked' : 'heart';

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleFavoriteGame = () => {
    if (userExists && !doc_id) {
      setIsFavoriteClicked(true);
      return addFavoriteGameAction({
        game_id: id,
        user_uid: user.user_uid,
        is_favorite: true,
      })
        .then(() => fetchUserFavoriteGames(user.user_uid))
        .catch((error) => {
          setOpen(true);
          setMessage(`Erro ao favoritar: ${error.code}`);
          setSeverity('error');
        });
    }
    if (userExists && doc_id) {
      setIsFavoriteClicked(false);
      return deleteFavoriteGameAction(doc_id)
        .then(() => fetchUserFavoriteGames(user.user_uid))
        .catch((error) => {
          setOpen(true);
          setMessage(`Erro ao remover favorito: ${error.code}`);
          setSeverity('error');
        });
    }
    setOpen(true);
    setMessage('É necessario estar logado para favoritar um jogo');
    setSeverity('info');
  };

  const handleUpdateFavoriteGame = (currentRating: any) => {
    if (userExists) {
      setRating(currentRating);
      return setFavoriteGameAction({
        game_id: id,
        user_uid: user.user_uid,
        doc_id,
        rating: currentRating,
        is_favorite: is_favorite ?? false,
      })
        .then(() => fetchUserFavoriteGames(user.user_uid))
        .catch((error) => {
          setOpen(true);
          setMessage(`Erro ao avaliar: ${error.code}`);
          setSeverity('error');
        });
    }
    setOpen(true);
    setMessage('É necessario estar logado para avaliar um jogo');
    setSeverity('info');
  };

  return (
    <>
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
          <Grid container justifyContent={'space-around'}>
            <Grid item>
              {' '}
              <img
                className={is_favorite ? 'heart-active' : changeButtonClass}
                onClick={handleFavoriteGame}
                src={HeartIcon}
                alt=''
              />
            </Grid>
            <Grid item>
              {' '}
              <Rating
                name='controlled'
                value={rating}
                onChange={(_, newValue) => handleUpdateFavoriteGame(newValue)}
              />
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      <SimpleSnackbar open={open} message={message} severity={severity} handleClose={handleClose} />
    </>
  );
};

export default GameCard;
