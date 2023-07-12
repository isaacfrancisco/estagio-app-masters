import { DropdownFilterProps } from '~/interfaces/DropdownFilterProps';
import './DropdownFilter.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DropdownFilter = ({
  genreSelected,
  handleDropdownChange,
  gamesGenre,
}: DropdownFilterProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel id='simple-select-label'>Genero</InputLabel>
      <Select
        labelId='simple-select-label'
        id='simple-select'
        value={genreSelected}
        label='Genero'
        onChange={handleDropdownChange}
      >
        <MenuItem value={''}>Selecione um gênero</MenuItem>
        {gamesGenre.map((genre, index) => {
          return (
            <MenuItem value={genre} key={index}>
              {genre}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default DropdownFilter;
