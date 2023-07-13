import { useState } from 'react';
import { ToggleButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const SortRatingButton = ({
  handleSortGames,
}: {
  handleSortGames: (selectedState: boolean) => void;
}) => {
  const [selected, setSelected] = useState(false);

  return (
    <ToggleButton
      value='check'
      selected={selected}
      onChange={() => {
        setSelected(!selected);
        handleSortGames(selected);
      }}
    >
      <StarIcon />
    </ToggleButton>
  );
};

export default SortRatingButton;
