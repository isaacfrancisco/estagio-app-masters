import { SelectChangeEvent } from '@mui/material';

export interface DropdownFilterProps {
  genreSelected: string;
  handleDropdownChange: (event: SelectChangeEvent) => void;
  gamesGenre: string[];
}
