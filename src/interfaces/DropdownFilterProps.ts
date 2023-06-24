import { ChangeEvent } from 'react';

export interface DropdownFilterProps {
  genreSelected: string;
  handleDropdownChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  gamesGenre: string[];
}
