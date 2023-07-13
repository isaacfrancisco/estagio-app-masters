import { useState } from 'react';
import { ToggleButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const SortRatingButton = ({
  handleSortGames,
  disabled,
}: {
  handleSortGames: (selectedState: boolean) => void;
  disabled: boolean;
}) => {
  const [selected, setSelected] = useState(false);

  return (
    <ToggleButton
      value='check'
      selected={selected}
      disabled={disabled}
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
