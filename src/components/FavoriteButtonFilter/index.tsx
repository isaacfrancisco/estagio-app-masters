import { useState } from 'react';
import { ToggleButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const FavoriteButtonFilter = ({
  handleFilterFavorites,
}: {
  handleFilterFavorites: (selectedState: boolean) => void;
}) => {
  const [selected, setSelected] = useState(false);

  return (
    <ToggleButton
      value='check'
      selected={selected}
      onChange={() => {
        setSelected(!selected);
        handleFilterFavorites(selected);
      }}
    >
      <FavoriteIcon />
    </ToggleButton>
  );
};

export default FavoriteButtonFilter;
